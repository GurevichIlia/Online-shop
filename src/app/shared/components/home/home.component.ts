import { HomeService } from './../../services/home.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Observable, combineLatest, } from 'rxjs';
import { takeUntil, switchMap, map, tap, take } from 'rxjs/operators';
import { Product } from '../../interfaces';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { ShippingMethod, StoreSettings } from './../../interfaces';
import { MainPageService } from './../../services/main-page.service';
import { ShopingCartService } from './../../services/shoping-cart.service';
import { ProductInCart } from 'src/app/shared/interfaces';
import { GeneralService } from './../../services/general.service';
import { NotificationsService } from './../../services/notifications.service';
import { ShopStateService } from './../../services/shop-state.service';

type TotalDetails = Observable<[ProductInCart[], number, ShippingMethod]>;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  subscription$ = new Subject();
  addedProductsToCart$: Observable<ProductInCart[]>;

  selectedProducts$: Observable<Product[]>;
  selectedProductsAmount$: Observable<number>;
  selectedShipingOption$: Observable<ShippingMethod>;

  totalDetails$: TotalDetails;

  currentTheme$: Observable<string>;
  isHandset$: Observable<boolean>;

  logo$: Observable<string>;
  productsFiltredBySearch$: Observable<Product[]>;

  storeSettings$: Observable<StoreSettings>;
  constructor(
    private homeService: HomeService,
    private shopStateService: ShopStateService,
    private notifications: NotificationsService,
    private generalService: GeneralService,
    private router: Router,
    private shopingCartService: ShopingCartService,
    private mainpageService: MainPageService
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    // this.apiService.getAllProductsAndCategoriesFromServer()
    //   .pipe(takeUntil(this.subscription$))
    //   .subscribe(productsAndCat => {
    //     if (productsAndCat) {

    //       const products = this.generalService.addKeyToObjectArray(productsAndCat.Products);

    //       this.shopStateService.setAllProducts(products);
    //       this.shopStateService.setCategories(productsAndCat.ProductCategories);

    //     }
    //   }, err => {
    //     this.notifications.error(err, 'Something went wrong');
    //   });
    this.getProductCategories();
    this.getAllProducts();


    this.addedProductsToCart$ = this.shopStateService.getAddedToCartProducts$()
    // .pipe(tap(products => products.length === 0 ? this.redirectToMainPageIfCartEmpty() : null));
    this.isOpenOrderDetails();
    this.selectedProductsAmount$ = this.addedProductsToCart$.pipe(map(products => this.generalService.calculateProductAmount(products)));
    this.selectedShipingOption$ = this.shopingCartService.getSelectedShipingOption();

    this.totalDetails$ = combineLatest([this.addedProductsToCart$, this.selectedProductsAmount$, this.selectedShipingOption$]);

    this.currentTheme$ = this.generalService.getTheme$();

    this.isHandset$ = this.generalService.isMobileView$();

    this.logo$ = this.mainpageService.getLogo();

    this.getStoreSettings();
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  getProductCategories() {
    this.homeService.getProductsWebGroup()
      .pipe(takeUntil(this.subscription$))
      .subscribe(({ ProductsWebGroups }) => {
        console.log('GROUP GOT', ProductsWebGroups);

        if (ProductsWebGroups) {
          this.shopStateService.setCategories(ProductsWebGroups);
        }
      }, err => this.notifications.error(err, 'Something went wrong'));



    // this.apiService.getWebGroupsProducts();

    // .pipe(takeUntil(this.subscription$))

    // .subscribe(products => {
    //   console.log('PRODUCTS', products);
    // })


  }

  redirectToMainPageIfCartEmpty() {
    this.router.navigate(['main-page']);
  }

  getAllProducts() {
    this.homeService.getAllProducts()
      .pipe(takeUntil(this.subscription$))
      .subscribe(products => {
        if (products) {
          this.shopStateService.setAllProducts(this.generalService.addKeyToObjectArray(products));
        }
      }, err => this.notifications.error(err, 'Something went wrong'));

  }

  isOpenOrderDetails() {
    this.generalService.openOrderDetails$
      .pipe(takeUntil(this.subscription$))
      .subscribe(() => {
        this.sidenav.open();
      });
  }

  removeFromCart(product: Product) {
    this.shopStateService.removeFromCart(product);
    console.log('REMOVE CART', product);

  }

  onEditShopingCart() {
    this.sidenav.close();
    this.openShopingCart();
  }

  openShopingCart() {
    this.router.navigate(['shoping-cart']);
  }

  onSelectTheme(theme: string) {
    this.generalService.setTheme(theme);
  }

  getStoreSettings() {
    this.storeSettings$ = this.homeService.getStoreSetting()
      .pipe(
        take(1),
        tap(settings => console.log('SETTINGS', settings))
      );
    // .subscribe(settings => console.log('SETTINGS', settings))
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription$.next();
    this.subscription$.complete();
  }
}
