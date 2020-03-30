import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  currentTheme$ = new BehaviorSubject<string>('orange-theme');
  openOrderDetails$ = new Subject();
  constructor() { }

  addKeyToObjectArray(products: Product[]) {
    if (products) {
      return products.map(product => ({ ...product, addedToCart: false }));
    } else {
      return [];
    }
  }

  openOrderSetails() {
    this.openOrderDetails$.next();
  }

  calculateProductAmount(paymentsList: ProductInCart[]) {
    const totalAmount = paymentsList.reduce((prevValue, currentValue) => {
      prevValue += currentValue.totalPrice;
      return prevValue;
    }, 0);

    return totalAmount;

  }

  setTheme(themeName: string) {
    this.currentTheme$.next(themeName);
  }

  getTheme$() {
    return this.currentTheme$.asObservable();
  }
}
