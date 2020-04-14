import { NotificationsService } from './../../shared/services/notifications.service';
import { GeneralService } from './../../shared/services/general.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { switchMap, map, tap, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ShopingCartService } from './../../shared/services/shoping-cart.service';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Product, ProductInCart, ShippingMethod } from 'src/app/shared/interfaces';



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
  constructor(
    private shopStateService: ShopStateService,
    private shopingCartService: ShopingCartService,
    private router: Router,
    private generalService: GeneralService,
    private notifications: NotificationsService
  ) { }

  ngOnInit(): void {
    this.selectedProducts$ = this.shopStateService.getAddedToCartProducts$()
      .pipe(map(products => {

        this.totalProductsAmount$ = of(this.generalService.calculateProductAmount(products));
        this.calculateTotalAmount();
        this.isCartEmpty = products.length === 0;
        return products;
      }));

    this.getSelectedShipingOption();

    this.shippingMethods$ = this.shopingCartService.getShippingMethods();
  }

  onShowProductInfo(product: Product) {
    const id = product.ProductId;
    this.router.navigate([`product-info/${id}`]);
    console.log('SHOW INFO', product);
  }

  onRemoveFromCart(product: Product) {
    this.shopStateService.removeFromCart(product);
  }

  onChangeProductQuantity(quantity: number, product: ProductInCart) {
    this.shopingCartService.setProductQuantity(product, quantity);
  }

  goPayment() {
    if (this.isCartEmpty) {
      return this.notifications.warn('Please add product to Cart');
    }

    this.router.navigate(['customer-info']);

  }

  onSelectOption(method: ShippingMethod) {

    this.shopingCartService.setSelectedShipingOption(method);

    this.calculateTotalAmount();

  }

  // calculateExtraOptionsAmount(options: Option[]) {
  //   this.totalExtraOptionsAmount$ = of(this.shopingCartService.calculateExtraOptionsAmount(options));
  // }

  getSelectedShipingOption() {
    this.selectedShipingOption$ = this.shopingCartService.getSelectedShipingOption()
      .pipe(
        shareReplay(),
      );
  }

  calculateTotalAmount() {
    this.totoalAmountForAll$ = this.selectedShipingOption$.pipe(switchMap((option: ShippingMethod) => {
      if (option && option.ShippingPrice) {
        return this.totalProductsAmount$.pipe(map(productsAmount => productsAmount + option.ShippingPrice));
      } else {
        return this.totalProductsAmount$;
      }

    }));

  }
}
