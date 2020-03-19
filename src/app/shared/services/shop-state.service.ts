import { ProductCategoryTree } from './../components/product-category-menu/product-category-menu.component';
import { ShopingPageService } from './shoping-page.service';
import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductCategory } from '../interfaces';
import { shareReplay, filter, map, find } from 'rxjs/operators';

const images = [
  { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
  { url: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2019/10/akbash-600x260.jpg?bust=1570807093&width=600' },
  { url: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2019/04/Alaskan-Klee-Kai-600x260.png?bust=1556286111&width=600' },

]

@Injectable({
  providedIn: 'root'
})
export class ShopStateService {
  products$ = new BehaviorSubject<Product[]>(null);

  categories$ = new BehaviorSubject<ProductCategory[]>(null);

  constructor(
    private notifications: NotificationsService,
    private shopingPageService: ShopingPageService
  ) { }



  setAllProducts(products: Product[]) {
    console.log('PRODUCTS STATE GOT', products);
    const addedImages = products.map(product => ({ ...product, images })); // FOR TESTING ONLY
    console.log('PRODUCTS WITH IMAGES', addedImages);

    this.products$.next(addedImages);
  }

  setCategories(categories: ProductCategory[]) {
    console.log('CATEGORIES STATE GOT', categories)
    this.categories$.next(categories);
  }

  getCategories$(): Observable<ProductCategoryTree[]> {
    return this.categories$.asObservable()
    .pipe(filter(categories => categories !== null),
     map(categories => this.shopingPageService.getNestedChildren(categories, 0)));

  }


  getProducts$() {
    return this.products$.asObservable().pipe(filter(products => products !== null));
  }

  getAddedToCardProducts$() {
    return  this.getProducts$().pipe(
      map(products => products.filter(product => product.addedToCart === true)));
  }

  addToCart(product: Product) {
    const oldState = this.products$.getValue();

    const newState = oldState.map(existProduct => {
      if (existProduct.ProductId === product.ProductId) {
        return { ...existProduct, addedToCart: true };
      } else {
        return existProduct;
      }

    });
    this.notifications.success('', 'Added to Cart');

    this.setAllProducts(newState);
  }

  removeFromCart(product: Product) {
    const oldState = this.products$.getValue();

    const newState = oldState.map(existProduct => {
      if (existProduct.ProductId === product.ProductId) {
        return { ...existProduct, addedToCart: false };
      } else {
        return existProduct;
      }

    });
    this.notifications.success('', 'Removed from Cart');
    this.setAllProducts(newState);
  }

  getProduct$(id: number) {
    return this.getProducts$().pipe(map(products => products.find(product => +product.ProductId === id)));

  }
}
