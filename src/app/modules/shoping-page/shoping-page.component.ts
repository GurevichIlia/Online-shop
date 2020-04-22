import { FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Product, ProductCategory } from 'src/app/shared/interfaces';

import { ShopingPageService } from './../../shared/services/shoping-page.service';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Router } from '@angular/router';
import { ProductCategoryTree } from 'src/app/shared/components/product-category-menu/product-category-menu.component';
@Component({
  selector: 'app-shoping-page',
  templateUrl: './shoping-page.component.html',
  styleUrls: ['./shoping-page.component.scss']
})
export class ShopingPageComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  productCategories$: Observable<ProductCategoryTree[]>;
  subscription$ = new Subject();
  constructor(
    private shopStateService: ShopStateService,
    private shopingPageService: ShopingPageService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.selectedProductCategory = this.fb.control('');
    // this.selectedProductCategory$ = this.shopingPageService.selectedCategory$;
    this.productCategories$ = this.shopStateService.getCategoriesForTree$();

    this.products$ = this.shopingPageService.getSelectedCategory$()
      .pipe(
        switchMap(category => {
          return this.shopStateService.getProductsFilteredByCategory$(category);
          // .pipe(map(products => [...products, ...products, ...products, ...products]));
        }), tap(products => console.log('CURRENT PRODUCTS By CATEGORY', products)));
    // this.shopingPageService.getSelectedCategory$()
    //   .pipe(takeUntil(this.subscription$))
    //   .subscribe(categoryId => {
    //     this.setDefaultCategory(categoryId);
    //   });
  }


  addToShopingCart(product: Product) {
    this.shopStateService.addToCart(product);
    console.log('ADD TO CART', product)

  }

  removeFromCart(product: Product) {
    this.shopStateService.removeFromCart(product);
    console.log('REMOVE CART', product);

  }

  showProductFullInfo(product: Product) {
    const id = product.ProductId;
    this.router.navigate([`product-info/${id}`]);
    console.log('SHOW INFO', product);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription$.next();
    this.subscription$.complete();
  }
}
