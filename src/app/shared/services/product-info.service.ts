import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopStateService } from './shop-state.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ProductsOption, ProductsOptionsItem } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  constructor(
    private apiService: ApiService,
    private shopState: ShopStateService
  ) { }

  onPreviousImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === 0 ? quantityPhotos : currentPhotoIndex - 1;


  }
  onNextImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === quantityPhotos ? 0 : currentPhotoIndex + 1;

  }

  getProductsFiles(productId: number) {
    return this.shopState.getShopSettings$()
      .pipe(
        switchMap(settings => {

          if (!settings) {
            return of([]);
          }

          return this.apiService.getProductsFiles(productId, settings.orgId)
            .pipe(
              map(res => res.Data.GetProductFileList),
            );
        })
      )

  }

  getProductsOptions(productId: number) {
    const orgName: string = this.shopState.getOrgName();

    return this.apiService.getProductsOptions(orgName, productId)
      .pipe(
        map(res => res.Data.ProductsStoreOptions)
      );

  }

  getProductsOptionItems(optionId: number) {

    const orgName: string = this.shopState.getOrgName();

    return this.apiService.getProductsOptionItems(orgName, optionId)
      .pipe(
        map(res => res.Data.ProductsStoreOptionItems),
      );
  }

  getOptionsWithNestedItems(productId: number): Observable<ProductsOption[]> {

    return this.getProductsOptions(productId)
      .pipe(
        map(options => options.map(option => this.convertAnyCaseToCamelCase(option, new ProductsOption()))),
        map(options => {

          const optionsWithItems: ProductsOption[] = options.map(option => {

            const items$ = this.getProductsOptionItems(option.productStoreOptionId)
              .pipe(
                map(items => items.map(item => this.convertAnyCaseToCamelCase(item, new ProductsOptionsItem()))),
                tap(items => console.log('OPTION ITEMS', items))
              )

            return { ...option, children$: items$ };

          });

          return optionsWithItems;

        }
        )
      )
  }

  convertAnyCaseToCamelCase<T, K>(gettingObject: T, neededObject: K) {
    if (!gettingObject && !neededObject) {
      return;
    }

    const finalObject: K = {} as K;
    const gettingObjectKeyValueArray = Object.entries(gettingObject);

    Object.keys(neededObject).map((needKey: string) => {
      const findedKeyValue = gettingObjectKeyValueArray
        .find((keyValue: string | any[]) => keyValue[0].toLocaleLowerCase() === needKey.toLocaleLowerCase()) as any[];

      if (findedKeyValue) {
        finalObject[needKey] = findedKeyValue[1];
      }

    })

    console.log('FINAL OBJECT', finalObject);
    return finalObject;
  }

  createFormGroupForAdditionalOptions(optionsItems: ProductsOption[]) {
    const formGroup = {};
    for (let i = 0; i < optionsItems.length; i++) {
      if (optionsItems[i].required === 1) {
        formGroup[i] = new FormControl('', Validators.required);
      } else {
        formGroup[i] = new FormControl('');

      }


    }

    return formGroup;
  }
}
