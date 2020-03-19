import { Injectable } from '@angular/core';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  addKeyToObjectArray(products: Product[]) {
    if (products) {
      return products.map(product => ({ ...product, addedToCart: false }));
    } else {
      return [];
    }


  }
}
