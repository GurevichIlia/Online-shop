import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { Product } from './../interfaces';
import { ApiService } from './api.service';
import { GeneralService } from './general.service';
import { LocalStorageService } from './local-storage.service';
import { ShopStateService } from './shop-state.service';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  isShowMobileMenu$ = new Subject<boolean>();
  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
    private shopState: ShopStateService,
    private titleService: Title
  ) { }

  getProductsWebGroup() {
    return this.shopState.getOrgName$()
      .pipe(
        switchMap(guid => {
          if (!guid) {
            return of(null);
          }
          return this.apiService.getProductsWebGroup(guid)
            .pipe(
              map(res => res.Data)
            );
        }));
  }

  getAllProducts() {
    return this.shopState.getOrgName$()
      .pipe(
        switchMap(guid => {
          if (!guid) {
            return of(null);
          }

          return this.apiService.getAllProducts(0, guid)
            .pipe(
              tap(res => console.log('TEST ', res)),

              pluck('Data'),
              map(data => data ? data.WebGroupsProduct : []),
              map(products => this.combineToOneProductById(products)),
              map(products =>
                products.map(product =>
                  ({
                    ...product,
                    MainWebImageName: this.generalService.getImageLink(+product.instituteId, product.ProductId, product.MainWebImageName)
                  }))),
              tap(products => console.log('ALL PRODUCTS', products)
              ));

        }));


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
            acc.ProductsWebGroups_GroupId.push(secondValue as string);

            return acc;
          }, product);
        array.push(sameProduct);
        products = products.filter(sameproduct => sameproduct.ProductId !== product.ProductId);

      }

    }
    return array;
  }

  getStoreSetting() {
    return this.apiService.getStoreSettings(this.shopState.getOrgName())
      .pipe(
        pluck('Data', 'GetStoreSetting', 0),
        tap(settings => {
          this.shopState.setShopSettings(settings);
          this.shopState.setShopGuid(settings.LandingPagesGUID);
          this.setPageTitle(settings.StoreName);
        })
      );
  }

  onShowMobileMenu() {
    this.isShowMobileMenu$.next(true);
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }


  // getProductsAddedToCartFromLocalStorage() {
  //   const products: ProductInCart[] = this.localStorage.getProductsAddedToCart();

  //   if (products && products.length > 0) {
  //     products.map(product => this.shopState.addToCart(product, product.quantity, false));
  //   }
  // }

}
