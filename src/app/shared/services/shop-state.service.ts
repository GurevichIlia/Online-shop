import { ProductCategoryTree } from './../components/product-category-menu/product-category-menu.component';
import { ShopingPageService } from './shoping-page.service';
import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductCategory, ProductInCart } from '../interfaces';
import { shareReplay, filter, map, find } from 'rxjs/operators';

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
  products$ = new BehaviorSubject<Product[]>(null);
  productsInCart$ = new BehaviorSubject<ProductInCart[]>([]);
  categories$ = new BehaviorSubject<ProductCategory[]>(null);

  constructor(
    private notifications: NotificationsService,
    private shopingPageService: ShopingPageService
  ) { }



  setAllProducts(products: Product[]) {
    console.log('PRODUCTS STATE GOT', products);
    const addedImages = products.map(product => ({ ...product, image })); // FOR TESTING ONLY
    console.log('PRODUCTS WITH IMAGES', addedImages);
    this.products$.next(addedImages);
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

  getProducts$() {
    return this.products$.asObservable().pipe(filter(products => products !== null));
  }

  // getAddedToCartProducts$() {
  //   return this.getProducts$().pipe(
  //     map(products => products.filter(product => product.addedToCart === true)));
  // }

  getAddedToCartProducts$() {
    return this.productsInCart$.asObservable();
  }

  addToCart(product: Product) {
    const oldState = this.products$.getValue();

    const newState = oldState.map((existProduct: Product) => {
      if (existProduct.ProductId === product.ProductId) {
        return { ...existProduct, addedToCart: true };
      } else {
        return existProduct;
      }

    });
    this.notifications.success('', 'Added to Cart');

    this.setAllProducts(newState);

    this.setProductsToCart(this.copyArrayWithAddedToCartProducts(newState));
  }

  copyArrayWithAddedToCartProducts(allProdacts: Product[]) {
    return [...allProdacts.filter(productInCart => productInCart.addedToCart === true)
      .map(productInCart => ({ ...productInCart, quantity: 1, totalPrice: +productInCart.Price }))];
  }

  setProductsToCart(products: ProductInCart[]) {
    this.productsInCart$.next(products);
  }

  removeFromCart(product: Product) {
    const oldState = this.products$.getValue();

    const newState = oldState.map((existProduct: Product) => {
      if (existProduct.ProductId === product.ProductId) {
        return { ...existProduct, addedToCart: false };
      } else {
        return existProduct;
      }

    });
    this.notifications.success('', 'Removed from Cart');
    this.setAllProducts(newState);

    this.setProductsToCart(this.productsInCart$.getValue().filter(productInCart => productInCart.ProductId !== product.ProductId));
  }


  getProduct$(id: number) {
    // tslint:disable-next-line: max-line-length
    return this.getProducts$().pipe(map(products => products.find((product: { ProductId: string | number; }) => +product.ProductId === id)));

  }


}