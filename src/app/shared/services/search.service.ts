import { ShopStateService } from './shop-state.service';
import { Injectable } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private shopStateService: ShopStateService) { }


  searchProducts(searchControl: Observable<string>): Observable<Product[]> {
    return searchControl.pipe(
      switchMap(value => {
        return this.shopStateService.getProductsWithoutFilter$()
          .pipe(
            map(products => {
              return products.filter(product =>
                this.filter(product, value))
                .map(product => {
                  return this.highlightLetters(product, value);
                });
            }))
      }))
  }

  private filter(product: Product, value: string) {
    if (value) {
      value = value.toLocaleLowerCase();

      if (product.ProdName.toLocaleLowerCase().includes(value) || product.PartNumber.toLocaleLowerCase().includes(value)) {

        return product;
      }
    }
  }

  private highlightLetters(product: Product, value: string) {
    const newproduct = {
      ...product,
      ProdName: product.ProdName.replace(value, `<strong>${value}</strong>`),
      PartNumber: product.PartNumber.replace(value, `<strong>${value}</strong>`)
    };
    return newproduct;
  }
}
