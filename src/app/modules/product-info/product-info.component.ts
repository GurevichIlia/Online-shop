import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith, switchMap, tap, takeUntil, shareReplay } from 'rxjs/operators';
import { Product, ProductsOption } from 'src/app/shared/interfaces';
import { ProductsOptionsItem, ProductInCart } from './../../shared/interfaces';
import { ProductInfoService } from './../../shared/services/product-info.service';
import { ShopStateService } from './../../shared/services/shop-state.service';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  productId: number;
  product$: Observable<Product>;
  productPrice$: Observable<number>;
  totalProductAmount$: Observable<number>;
  currentPhotoIndex = 0;
  productQuantity$ = new BehaviorSubject<number>(1);
  productOptionsWithNestedItems$: Observable<ProductsOption[]>;
  subscriptions$ = new Subject();
  additionalOptions$ = new BehaviorSubject<ProductsOptionsItem[]>([]);
  additionalOptionsPrice$ = new BehaviorSubject<number>(0);
  optionsForm: FormGroup;
  // productData$ = combineLatest([
  //   this.productQuantity$,
  //   this.productPrice$,
  //   this.totalProductAmount$
  // ])
  //   .pipe(
  //     map(([quantity, productPrice, totalProductPrice]) => ({ quantity, productPrice, totalProductPrice })));
  // quantityPhotos: number;
  constructor(
    private route: ActivatedRoute,
    private shopStateService: ShopStateService,
    private productInfoService: ProductInfoService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.getProductId();
    this.getProductOptionsWithNestedItems();
    window.scrollTo({ top: 100 });
    this.product$ = combineLatest(
      [
        this.shopStateService.getProduct$(this.productId),
        this.productInfoService.getProductsFiles(this.productId)
      ]
    )
      .pipe(
        map(([product, productFiles]) => {
          const transformedProduct = { ...product, files: productFiles };
          return transformedProduct;
        }),
        switchMap(product => {

          if (product.addedToCart) {

            return this.shopStateService.getAddedToCartProducts$()
              .pipe(
                map(products => products.find(existProduct => existProduct.ProductId === product.ProductId)),
                map(productInCart => productInCart ? { ...product, quantity: productInCart.quantity } : product)
              );

          } else {
            return of(product);
          }


        }),
        shareReplay(),
        tap(product => this.selectMainImageWhenProductInitial(product)),
        tap(product => console.log('PRODUCT', product))
      );


    this.getTotalProductPrice();
  }

  // getProductPrice() {
  //   this.productPrice$ = combineLatest(
  //     [
  //       this.additionalOptionsPrice$.asObservable(),
  //       this.product$.pipe(map(product => product.Price))
  //     ]).pipe(
  //       map(([optionsPrice, productPrice]) => +productPrice + optionsPrice),
  //     );

  // }

  getTotalProductPrice() {
    this.totalProductAmount$ = combineLatest(
      [
        this.additionalOptionsPrice$.asObservable(),
        this.productQuantity$.asObservable()
      ])
      .pipe(
        switchMap(([optionsPrice, quantity]) =>
          this.product$
            .pipe(
              map(product => (+product.Price + optionsPrice) * quantity)
            )

        ));

  }

  createOptionsForm(options: ProductsOption[]) {
    const formGroup = this.productInfoService.createFormGroupForAdditionalOptions(options);
    this.optionsForm = this.fb.group(formGroup);

    this.getSelectedAdditionOptionsPrice();
  }

  getProductId() {
    this.productId = +this.route.snapshot.paramMap.get('id');
  }


  getProductOptionsWithNestedItems() {
    this.productOptionsWithNestedItems$ = this.productInfoService.getOptionsWithNestedItems(this.productId)
      .pipe(
        tap(res => console.log('NESTED OPTIONS', res)),
        tap(options => this.createOptionsForm(options))
      );
  }

  selectMainImageWhenProductInitial(product: Product) {
    const imageIndex = product.files.findIndex(file => product.MainWebImageName === file.FullName);
    this.onSelectImage(imageIndex);
  }


  onSelectImage(index: number) {
    this.currentPhotoIndex = index;
  }

  onPreviousImage(photosArrayLength: number) {
    this.currentPhotoIndex = this.productInfoService.onPreviousImage(this.currentPhotoIndex, photosArrayLength - 1);

  }

  onNextImage(photosArrayLength: number) {
    this.currentPhotoIndex = this.productInfoService.onNextImage(this.currentPhotoIndex, photosArrayLength - 1);
  }

  addToShopingCart(product: Product) {
    if (this.optionsForm.invalid) {
      this.markRequiredControlsAsTouched();
      return;
    }


    this.shopStateService.addToCart(product, this.productQuantity$.getValue(), true, this.additionalOptions$.getValue());
    console.log('ADD TO CART', product);

  }


  markRequiredControlsAsTouched() {
    const controlsKeys = Object.keys(this.optionsForm.controls);

    controlsKeys.forEach(key => {
      if (this.optionsForm.controls[key].invalid) {
        this.optionsForm.controls[key].markAsTouched();
        this.optionsForm.controls[key].updateValueAndValidity();

      }
    })
  }
  // onBuyNow(product: Product) {
  //   if (product.addedToCart) {
  //     this.openShopingCart();
  //     return;
  //   }

  //   this.openShopingCart();
  //   this.shopStateService.addToCart(product, this.productQuantity$.getValue());
  // }

  openShopingCart() {
    this.router.navigate(['shoping-cart']);
  }

  onIncrease(quantity: number) {
    const updatedQuantity = quantity + 1;
    this.productQuantity$.next(updatedQuantity);

  }

  onDecrease(quantity: number) {
    if (quantity !== 1) {
      const updatedQuantity = quantity - 1;
      this.productQuantity$.next(updatedQuantity);
    }

  }

  // removeFromCart(product: Product) {
  //   this.shopStateService.removeFromCart(product);
  //   console.log('REMOVE CART', product);

  // }

  getSelectedAdditionOptionsPrice() {
    this.optionsForm.valueChanges
      .pipe(
        map(items => {
          const addedOptions = this.getAdditionalOptionsValueFromFormGroup(items);
          console.log('PRODUCT ITEMS', addedOptions);
          return addedOptions;
        }),
        tap(addedItems => this.getSelectedAdditionOptions(addedItems)),
        map(addedItems => this.shopStateService.calculateAdditionaOptionsPrice(addedItems)),
        takeUntil(this.subscriptions$)
      )
      .subscribe(itemsPrice => this.additionalOptionsPrice$.next(itemsPrice));
  }

  getAdditionalOptionsValueFromFormGroup(items: any) {
    return Object.values(items)
      .filter(item => item)
      .map((item: ProductsOptionsItem) => ({ ...item }));
  }



  getSelectedAdditionOptions(items: ProductsOptionsItem[]) {
    this.additionalOptions$.next(items);
  }


  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
