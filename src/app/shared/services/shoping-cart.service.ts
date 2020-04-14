import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ProductInCart, ShippingMethod } from '../interfaces';
import { ShopStateService } from './shop-state.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {
  selectedShipingOption$ = new BehaviorSubject<ShippingMethod>(null);
  constructor(
    private shopStateService: ShopStateService,
    private apiService: ApiService

  ) { }

  setProductQuantity(product: ProductInCart, quantity: number) {
    const newState = this.shopStateService.productsInCart$.getValue()
      .map(existProduct => existProduct.ProductId === product.ProductId
        ? ({ ...existProduct, quantity, totalPrice: +existProduct.Price * quantity })
        : existProduct);

    this.shopStateService.setProductsToCart(newState);
  }

  setSelectedShipingOption(method: ShippingMethod) {
    this.selectedShipingOption$.next(method);
  }


  getSelectedShipingOption() {
    return this.selectedShipingOption$.asObservable();
  }

  getShippingMethods() {
    return this.apiService.getShippingMethods()
      .pipe(map(res => res.Data.StoreShipping),
        tap(methods => this.setSelectedShipingOption(methods[0])));

  }
}
