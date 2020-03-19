import { FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, startWith, tap, takeUntil } from 'rxjs/operators';
import { ProductCategory, Product } from 'src/app/shared/interfaces';

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
  selectedProductCategory$ = new Subject();
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
    this.productCategories$ = this.shopStateService.getCategories$().pipe(tap(cat => console.log('CATEGORIES IN PAGE', cat)));


    this.products$ = this.shopingPageService.getSelectedCategory$()
      .pipe(switchMap(category => {
        let products$: Observable<Product[]>;
        if (category) {
          products$ = this.shopStateService.getProducts$()
            .pipe(map(products => products.filter(product => +product.ProductsWebGroups_GroupId === category)));

        } else {
          products$ = this.shopStateService.getProducts$();
        }
        return products$;
      }));

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
    this.subscription$.complete()
  }
}
