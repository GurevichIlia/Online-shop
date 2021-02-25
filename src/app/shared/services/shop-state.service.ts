import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Product, ProductCategory, ProductsOptionsItem, StoreSettings } from '../interfaces';
import { ProductCategoryTree } from './../components/product-category-menu/product-category-menu.component';
import { AdditionalOption, ProductInCart } from './../interfaces';
import { GeneralService } from './general.service';
import { LocalStorageService } from './local-storage.service';
import { NotificationsService } from './notifications.service';
import { ShopingPageService } from './shoping-page.service';

// const images = [
//   { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
//   { url: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2019/10/akbash-600x260.jpg?bust=1570807093&width=600' },
//   { url: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2019/04/Alaskan-Klee-Kai-600x260.png?bust=1556286111&width=600' },

// ]

const image = { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' };
@Injectable({
  providedIn: 'root'
})
export class ShopStateService {
  shopSettings = new BehaviorSubject<StoreSettings>(null);
  public orgName: string;
  products$ = new BehaviorSubject<Product[]>([]);
  productsInCart$ = new BehaviorSubject<ProductInCart[]>([]);
  categories$ = new BehaviorSubject<ProductCategory[]>([]);
  isFeaturedProductsCategories$ = new BehaviorSubject<ProductCategory[]>([]);
  isNewProductsCategories$ = new BehaviorSubject<ProductCategory[]>([]);

  readonly shopGUID$ = new BehaviorSubject<string>('');

  constructor(
    private notifications: NotificationsService,
    private shopingPageService: ShopingPageService,
    private generalService: GeneralService,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {
    this.setOrgName(this.getOrgNameFromRouteUrl())
  }



  getOrgNameFromRouteUrl() {
    // const currentUrl = 'https://shop.amax.co.il/shopping-page';
    // const currentUrl = 'https://amax.amax.co.il/main-page';
    // const currentUrl = 'https://kevatry.amax.co.il/main-page';

    let currentUrl = this.document.URL;

    if (currentUrl.includes('localhost')) {
      currentUrl = 'https://amax.amax.co.il/main-page';
      // currentUrl = 'https://israelparkinson.amax.co.il/main-page';
    }

    const domen = currentUrl.split('/')[2];
    const orgName = domen.substr(0, domen.indexOf('.'));
    return orgName;
  }


  setAllProducts(products: Product[]) {
    console.log('PRODUCTS STATE GOT', products);
    // const addedImages = products.map(product => ({ ...product, image })); // FOR TESTING ONLY
    // console.log('PRODUCTS WITH IMAGES', addedImages);
    this.products$.next(products);

  }

  setCategories(categories: ProductCategory[]) {
    console.log('CATEGORIES STATE GOT', categories);
    this.categories$.next(categories);
  }

  getCategoriesForTree$(): Observable<ProductCategoryTree[]> {
    return this.categories$.asObservable()
      .pipe(filter(categories => categories !== null),
        map(categories => this.shopingPageService.getNestedChildren(categories, 0)));

  }

  getCategories$(): Observable<ProductCategory[]> {
    return this.categories$.asObservable();

  }

  getProductsFilteredByCategory$(categoryId: number = null) {
    return this.products$.asObservable()
      .pipe(
        map(products => {
          return this.generalService.filterByCategory(products, categoryId);
        })
      );
  }

  getProductsWithoutFilter$() {
    return this.products$.asObservable()
      .pipe(

        map(products => {
          // return this.generalService.filterByCategory(products, categoryId);
          return products;
        })
      );
  }

  getAddedToCartProducts$() {
    return this.productsInCart$.asObservable();
  }

  addToCart(product: Product, productQuantity = 1, isNotification = true, additionalOptions?: ProductsOptionsItem[]) {
    const aditionalOptionsPrice = this.calculateAdditionaOptionsPrice(additionalOptions);
    const productPrice = (+product.Price + aditionalOptionsPrice);
    const newProduct = {
      ...product,
      quantity: productQuantity,
      totalPrice: productPrice * productQuantity,
      additionalOption: additionalOptions.map(option => {
        const additionalOption: AdditionalOption = {
          productStoreOptionItemName: option.productStoreOptionItemName,
          productStoreOptionItemId: option.productStoreOptionItemId,
          productStoreOptionItemPrice: option.productStoreOptionItemPrice
        };

        return additionalOption;
      })
    } as ProductInCart;
    delete newProduct.ProductsWebGroups_GroupId;

    const foundProduct = this.findProductInCart(newProduct, [...this.productsInCart$.getValue()]);
    let message = '';

    this.translate.get('Added to Cart')
      .pipe(take(1))
      .subscribe(translation => message = translation);


    if (foundProduct) {
      this.addProductToExistProduct(newProduct, foundProduct);
      this.notifications.success('', message);
      return;
    }

    this.addNewProduct(newProduct);

    if (isNotification) {
      this.notifications.success('', message);
    }

  }

  addNewProduct(newProduct: ProductInCart) {
    const addedProducts: ProductInCart[] = [...this.productsInCart$.getValue(), newProduct];
    this.setProductsToCart(addedProducts);
  }

  findProductInCart(product: ProductInCart, products: ProductInCart[]) {

    const findedProducts = products.filter(existProduct => existProduct.ProductId === product.ProductId)
      .filter(existProduct => existProduct.additionalOption.length === product.additionalOption.length);

    const findedProduct = findedProducts.find((existProduct, i) => {
      const existOptions = JSON.stringify(existProduct.additionalOption);
      const newOptions = JSON.stringify(product.additionalOption);

      const compare = existOptions === newOptions;

      if (compare) {
        return existProduct;
      }
    });

    return findedProduct;
  }

  addProductToExistProduct(newProduct: ProductInCart, existProduct: ProductInCart) {

    existProduct.quantity = existProduct.quantity = existProduct.quantity + newProduct.quantity,
      // tslint:disable-next-line: max-line-length
      // totalPrice: existProduct.totalPrice = existProduct.totalPrice + ((+newProduct.Price + optionsPriceForNewProduct) * newProduct.quantity)
      existProduct.totalPrice = existProduct.totalPrice = existProduct.totalPrice + newProduct.totalPrice;

  }



  setProductsToCart(products: ProductInCart[]) {
    this.productsInCart$.next(products);
    console.log('PRODUCT IN CART', this.productsInCart$.getValue());

  }

  removeFromCart(productIndex: number) {

    const productsInCart = this.productsInCart$.getValue()
      .filter((product, index) => {
        return index !== productIndex;
      });

    this.setProductsToCart(productsInCart);
  }

  getProduct$(id: number) {
    // tslint:disable-next-line: max-line-length
    return this.getProductsWithoutFilter$()
      .pipe(
        filter(products => products !== null && products !== undefined),
        map(products => products.find((product: { ProductId: string | number; }) => +product.ProductId === id))
      );
  }

  setShopGuid(guid: string) {
    this.shopGUID$.next(guid);
  }

  getShopGuid() {
    return this.shopGUID$.getValue();
  }

  getShopGuid$() {
    return this.shopGUID$.asObservable();
  }

  setOrgName(orgName: string) {
    this.orgName = orgName;
  }

  getOrgName() {
    return this.orgName;
  }

  getOrgName$() {
    return of(this.getOrgName());
  }

  setShopSettings(shopSettings: StoreSettings) {
    this.shopSettings.next(shopSettings);
  }

  getShopSettings$() {
    return this.shopSettings.asObservable();
  }

  calculateAdditionaOptionsPrice(items: AdditionalOption[]) {
    return items.reduce((acc, currValue) => {
      acc += +currValue.productStoreOptionItemPrice;
      return acc;
    }, 0);

  }

  setIsNewOrIsFeaturedCategories(categories: ProductCategory[], type: 'featured-products' | 'new-products') {

    if (type === 'featured-products') {
      this.isFeaturedProductsCategories$.next(categories);
      return;
    }

    if (type === 'new-products') {
      this.isNewProductsCategories$.next(categories);
      return;
    }
  }

  getIsNewOrIsFeaturedCategories(categories: ProductCategory[], type: 'featured-products' | 'new-products') {

    if (type === 'featured-products') {

      return this.isFeaturedProductsCategories$.asObservable();
    }

    if (type === 'new-products') {
      return this.isNewProductsCategories$.asObservable();
    }
  }

}
