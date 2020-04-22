import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Product } from 'src/app/shared/interfaces';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { ProductInfoService } from './../../shared/services/product-info.service';
import { switchMap, map, tap, find } from 'rxjs/operators';
import { ShopStateService } from './../../shared/services/shop-state.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  product$: Observable<Product>;
  totalProductAmount$: Observable<number>;
  currentPhotoIndex = 0;
  productQuantity$ = new BehaviorSubject<number>(1);
  // quantityPhotos: number;
  constructor(
    private route: ActivatedRoute,
    private shopStateService: ShopStateService,
    private productInfoService: ProductInfoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 100 });
    this.product$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          combineLatest(
            [this.shopStateService.getProduct$(+params.get('id')),
            this.productInfoService.getProductsFiles(+params.get('id'))]
          )),
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
        tap(product => this.selectMainImageWhenProductInitial(product)),
        tap(product => console.log('PRODUCT', product))
      );


    this.totalProductAmount$ = this.productQuantity$.asObservable()
      .pipe(
        switchMap(quantity =>
          this.product$.pipe(
            map(product => +product.Price * quantity))
        )
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
    this.shopStateService.addToCart(product, this.productQuantity$.getValue());
    console.log('ADD TO CART', product);

  }

  onBuyNow(product: Product) {
    if (product.addedToCart) {
      this.openShopingCart();
      return;
    }

    this.openShopingCart();
    this.shopStateService.addToCart(product, this.productQuantity$.getValue());
  }

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

  removeFromCart(product: Product) {
    this.shopStateService.removeFromCart(product);
    console.log('REMOVE CART', product);

  }
}
