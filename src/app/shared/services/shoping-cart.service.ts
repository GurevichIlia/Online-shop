import { Injectable } from '@angular/core';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  constructor() { }

  calculateAmount(paymentsList: Product[]) {
    const totalAmount = paymentsList.reduce((prevValue, currentValue) => {
      prevValue += (+currentValue.Price);
      return prevValue;
    }, 0);

    return totalAmount;

  }
}
