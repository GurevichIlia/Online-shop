import { GeneralService } from './../../services/general.service';
import { NotificationsService } from './../../services/notifications.service';
import { ShopStateService } from './../../services/shop-state.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Product } from '../../interfaces';
import { Router } from '@angular/router';
import { ShopingPageService } from '../../services/shoping-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription$ = new Subject();
  addedProductsToCart$: Observable<Product[]>;
  constructor(
    private apiService: ApiService,
    private shopStateService: ShopStateService,
    private notifications: NotificationsService,
    private generalService: GeneralService,
    private shopingPageService: ShopingPageService,
    private router: Router
  ) { }

  ngOnInit(): void {
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


    this.addedProductsToCart$ = this.shopStateService.getAddedToCardProducts$();
  }

  getProductCategories() {
    this.apiService.getProductsWebGroup()
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

  getAllProducts() {
    this.apiService.getWebGroupsProducts()
      .pipe(takeUntil(this.subscription$))
      .subscribe(({ WebGroupsProduct }) => {
        console.log('PRODUCT GOT', WebGroupsProduct);

        if (WebGroupsProduct) {
          const products = this.generalService.addKeyToObjectArray(WebGroupsProduct);
          this.shopStateService.setAllProducts(products);
        }
      }, err => this.notifications.error(err, 'Something went wrong'));



    // this.apiService.getWebGroupsProducts();

    // .pipe(takeUntil(this.subscription$))

    // .subscribe(products => {
    //   console.log('PRODUCTS', products);
    // })


  }


  openShopingCart() {
    this.router.navigate(['shoping-cart']);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription$.next();
    this.subscription$.complete();
  }
}
