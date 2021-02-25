import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Product, ShippingMethod } from 'src/app/shared/interfaces';
import { StyleConfig, StyleConfigService } from './../../core/style-config/style-config';
import { GeneralService } from './../../shared/services/general.service';
import { NotificationsService } from './../../shared/services/notifications.service';
import { ShopingCartService } from './../../shared/services/shoping-cart.service';





@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {
  shippingMethods$: Observable<ShippingMethod[]>;
  selectedProducts$: Observable<Product[]>;
  selectedShipingOption$: Observable<ShippingMethod>;

  totalProductsAmount$: Observable<number> = of(0);

  totoalAmountForAll$: Observable<number>;

  isCartEmpty = true;
  numberOfPayments = new FormControl(1, [Validators.max(3), Validators.min(1)]);
  numberOfPayments$: Observable<number>;
  styles$: Observable<StyleConfig> = this.styleConfigService.getStyles()

  constructor(
    private shopingCartService: ShopingCartService,
    private router: Router,
    private generalService: GeneralService,
    private notifications: NotificationsService,
    private styleConfigService: StyleConfigService

  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 100 });

    this.selectedProducts$ = this.shopingCartService.getAddedToCartProducts$()
      .pipe(
        map(products => {

          this.totalProductsAmount$ = of(this.generalService.calculateProductAmount(products));
          this.calculateTotalAmount();
          this.isCartEmpty = products.length === 0;
          return products;
        }));

    this.getSelectedShipingOption();

    this.shippingMethods$ = this.shopingCartService.getShippingMethods();

    this.numberOfPayments$ = this.shopingCartService.getNumberOfPayments()
      .pipe(
        tap(numberOfPayments => this.numberOfPayments.patchValue(numberOfPayments)
        )
      );
  }

  onShowProductInfo(product: Product) {
    const id = product.ProductId;
    this.router.navigate([`product-info/${id}`]);
    console.log('SHOW INFO', product);
  }

  onRemoveFromCart(productIndex: number) {
    this.shopingCartService.removeFromCart(productIndex);
  }

  onChangeProductQuantity(quantity: number, productIndex: number) {
    this.shopingCartService.setProductQuantity(productIndex, quantity);
  }

  goPayment() {
    if (this.isCartEmpty) {
      return this.notifications.warn('Please add product to Cart');
    }

    if (this.numberOfPayments.invalid) {
      return this.notifications.warn(`Maximum number of payments 3`);
    }

    this.router.navigate(['customer-info']);
    this.shopingCartService.setNumberOfPayments(this.numberOfPayments.value);
  }

  onSelectOption(method: ShippingMethod) {

    this.shopingCartService.setSelectedShipingOption(method);

    // this.calculateTotalAmount();

  }

  // calculateExtraOptionsAmount(options: Option[]) {
  //   this.totalExtraOptionsAmount$ = of(this.shopingCartService.calculateExtraOptionsAmount(options));
  // }

  getSelectedShipingOption() {
    this.selectedShipingOption$ = this.shopingCartService.getSelectedShipingOption()
      .pipe(
        debounceTime(1),
        switchMap(selectedShippingMethod => {
          if (selectedShippingMethod && selectedShippingMethod.Shippingid) {
            return of(selectedShippingMethod);
          } else {
            return this.shippingMethods$.pipe(
              filter(methods => methods.length !== 0),
              map(methods => methods[0]),
              tap(initialMethod => this.shopingCartService.setSelectedShipingOption(initialMethod))
            )
          }
        }),
        shareReplay(),
        tap(op => console.log('SELECTED OPTION', op))
      );
  }

  calculateTotalAmount() {
    this.totoalAmountForAll$ = this.selectedShipingOption$
      .pipe(
        switchMap((option: ShippingMethod) => {
          if (option && option.ShippingPrice) {
            return this.totalProductsAmount$
              .pipe(
                map(productsAmount => productsAmount + option.ShippingPrice)
              );
          } else {
            return this.totalProductsAmount$;
          }

        }));

  }
}
