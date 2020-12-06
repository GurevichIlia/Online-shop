import { ProductInCart } from './../interfaces';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    const newValue: string = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  }

  getItem(key: string) {
    const item = JSON.parse(localStorage.getItem(key));

    return item;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  saveAddedToCartProducts(productsInCart: ProductInCart[]) {

    const products = productsInCart;

    this.setItem('productsInCart', products);
  }

  getProductsAddedToCart() {
    const products = this.getItem('productsInCart');

    return products;
  }

  removeProductsAddedToCartFromLocalStorage() {
    this.removeItem('productsInCart');
  }
}
