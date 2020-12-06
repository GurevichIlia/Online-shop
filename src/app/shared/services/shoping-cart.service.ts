import { LocalStorageService } from './local-storage.service';
import { Product, ProductsOptionsItem } from './../interfaces';
import { ApiService } from './api.service';
import { BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ProductInCart, ShippingMethod } from '../interfaces';
import { ShopStateService } from './shop-state.service';
import { tap, map, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {
  initialShipingMethod: ShippingMethod = {
    Shippingid: null,
    ShippingMethood: '',
    ShippingMethoodEng: '',
    ShippingPrice: 0,
    ShippingOrder: null,
    OrgId: null
  }

  selectedShipingOption$ = new BehaviorSubject<ShippingMethod>(this.initialShipingMethod);
  numberOfPayments$ = new BehaviorSubject<number>(1);

  constructor(
    private shopStateService: ShopStateService,
    private apiService: ApiService,
    private localStorageService: LocalStorageService

  ) {

  }

  setProductQuantity(productIndex: number, quantity: number) {
    const newState = this.shopStateService.productsInCart$.getValue()
      .map((existProduct, index) => index === productIndex
        ? ({
          ...existProduct, quantity,
          totalPrice:
            (+existProduct.Price +
              this.shopStateService.calculateAdditionaOptionsPrice(existProduct.additionalOption as Partial<ProductsOptionsItem[]>))
            * quantity
        })
        : existProduct);

    this.shopStateService.setProductsToCart(newState);
  }

  setSelectedShipingOption(method: ShippingMethod) {
    this.selectedShipingOption$.next(method);
  }

  setInitialShippingOption(method: ShippingMethod) {
    this.setSelectedShipingOption(method);
  }

  getSelectedShipingOption() {
    return this.selectedShipingOption$.asObservable();
  }

  getShippingMethods() {
    return this.shopStateService.getOrgName$()
      .pipe(
        switchMap(guid => {
          if (!guid) {
            return of([]);
          }
          return this.apiService.getShippingMethods(guid)
            .pipe(
              map(res => res.Data.StoreShipping)

            );
        }));



  }

  setNumberOfPayments(numberOfPayments: number) {
    this.numberOfPayments$.next(numberOfPayments);
  }

  public getNumberOfPayments() {
    return this.numberOfPayments$.asObservable();
  }

  getAddedToCartProducts$() {
    return this.shopStateService.getAddedToCartProducts$()
      .pipe(
        tap(products => this.localStorageService.saveAddedToCartProducts(products)));
  }

  // removeFromCart(product: Product) {
  //   this.shopStateService.removeFromCart(product);
  // }

  removeFromCart(productIndex: number) {
    this.shopStateService.removeFromCart(productIndex);
  }

}
