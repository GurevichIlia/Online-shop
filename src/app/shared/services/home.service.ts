import { GeneralService } from './general.service';
import { Product } from './../interfaces';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService
  ) { }

  getProductsWebGroup() {
    return this.apiService.getProductsWebGroup()
      .pipe(
        map(res => res.Data)
      );
  }

  getAllProducts() {
    return this.apiService.getAllProducts(0)
      .pipe(
        map(res => res.Data.WebGroupsProduct),
        map(products => this.combineToOneProductById(products)),
        map(products =>
          products.map(product =>
            ({
              ...product,
              MainWebImageName: this.generalService.getImageLink(+product.instituteId, product.ProductId, product.MainWebImageName)
            }))),
        tap(products => console.log('ALL PRODUCTS', products)
        ));
  }

  combineToOneProductById(products: Product[]) {
    const copyProducts = [...products];
    const array: Product[] = [];
    for (const product of products) {
      const isExistProduct = array.find(existProduct => product.ProductId === existProduct.ProductId);
      if (!isExistProduct) {
        const sameProduct = products.filter(sameproduct => sameproduct.ProductId === product.ProductId)
          // .map(producttest => ({ ...producttest, ProductsWebGroups_GroupId: [] }))
          .reduce((acc, value) => {
            const secondValue = value.ProductsWebGroups_GroupId;
            if (typeof acc.ProductsWebGroups_GroupId === 'string') {
              acc.ProductsWebGroups_GroupId = [] as string[];
            }
            acc.ProductsWebGroups_GroupId.push(secondValue as string)

            return acc;
          }, product);
        console.log(sameProduct)
        array.push(sameProduct);
        products = products.filter(sameproduct => sameproduct.ProductId !== product.ProductId);

      }

    }
    console.log('NEW ARRAy', array);
    return array;
  }
}
