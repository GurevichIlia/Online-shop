import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ProductInCart } from '../interfaces';
import { ShopStateService } from './shop-state.service';
import { map } from 'rxjs/operators';

export interface Option {
  price: number;
  name: string;
  id: number;

}

// FOR TESTING
const EXTRA_OPTIONS: Option[] = [
  { price: 35, name: 'option1', id: 1 },
  { price: 23, name: 'option2', id: 2 },
  { price: 60, name: 'option3', id: 3 },
  { price: 79, name: 'option4', id: 4 }


];

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {
  initialOption = EXTRA_OPTIONS[0]
  selectedShipingOption$ = new BehaviorSubject<Option>(this.initialOption);;
  constructor(private shopStateService: ShopStateService) { }

  setProductQuantity(product: ProductInCart, quantity: number) {
    const newState = this.shopStateService.productsInCart$.getValue()
      .map(existProduct => existProduct.ProductId === product.ProductId
        ? ({ ...existProduct, quantity, totalPrice: +existProduct.Price * quantity })
        : existProduct);

    this.shopStateService.setProductsToCart(newState);
  }

  setSelectedShipingOption(optionId: number) {
    this.selectedShipingOption$.next(this.findOption(optionId));
  }

  findOption(id: number) {
    return this.getOptions().find(option => option.id === id);
  }

  getSelectedShipingOption() {
    return this.selectedShipingOption$.asObservable();
  }


  // FOR TESTING
  getOptions() {
    return EXTRA_OPTIONS;
  }

  setInitialOption() {
    this.setSelectedShipingOption(this.initialOption.id);
  }
  // addOption(option: Option, options: Option[]) {
  //   let addedOptions = [...options];
  //   const isOptionExist = options.find(existOption => existOption.id === option.id);

  //   if (!isOptionExist) {
  //     addedOptions.push(option);
  //   } else {
  //     addedOptions = addedOptions.filter(existOption => existOption.id !== option.id)
  //   }

  //   return addedOptions;
  // }

  // calculateExtraOptionsAmount(paymentsList: Option[]) {
  //   const totalAmount = paymentsList.reduce((prevValue, currentValue) => {
  //     prevValue += currentValue.price;
  //     return prevValue;
  //   }, 0);

  //   return totalAmount;

  // }
}
