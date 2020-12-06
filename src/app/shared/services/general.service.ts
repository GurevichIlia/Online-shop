import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductInCart } from '../interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  currentTheme$ = new BehaviorSubject<string>('orange-theme');
  openOrderDetails$ = new Subject();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        if (result.matches) {
          return result.matches;
        };
      }));
  constructor(
    private breakpointObserver: BreakpointObserver,
    private localStorageService: LocalStorageService,
  ) {

  }

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

  isMobileView$() {
    return this.isHandset$;
  }

  getImageLink(orgId: number, imageFolder: string, imageName: string) {
    // https://secure.amax.co.il/Upload/153P/LogoFileName1/logo.jpg // EXAMPLE
    const imageLink = `https://secure.amax.co.il/Upload/${orgId}P/${imageFolder}/${imageName}`;
    return imageLink;
  }

  public filterByCategory(products: Product[], categoryId: number) {
    if (products && categoryId) {
      const filteredProducts = products.filter(product => {
        const assignedGroups = product.ProductsWebGroups_GroupId as string[];
        const findedId = assignedGroups.find(id => +id === categoryId);
        if (findedId) {
          return product;
        }
      });
      return filteredProducts;
    } else if (!categoryId) {
      return products;
    }

  }



}
