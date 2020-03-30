import { ProductCategory, Product } from './../../shared/interfaces';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;
  currentFeaturedProductsCategory$ = new BehaviorSubject<ProductCategory>({} as ProductCategory);
  currentNewArrivalsCategory$ = new BehaviorSubject<ProductCategory>({} as ProductCategory);

  featuredProducts$: Observable<Product[]>;
  newArrivalsProducts$: Observable<Product[]>;

  constructor(private shopStateService: ShopStateService) { }

  ngOnInit(): void {
    this.productCategories$ = this.shopStateService.getCategories$().pipe(tap(cat => console.log('CATEGORIES IN PAGE', cat)));

    this.getNewArrivalsProducts();
    this.getFeaturedProducts();
  }

  getNewArrivalsProducts() {
    this.newArrivalsProducts$ = this.currentNewArrivalsCategory$
      .pipe(switchMap(category => {
        return this.shopStateService.getProducts$()
          .pipe(map(products => products.filter(product => {
            return +product.ProductsWebGroups_GroupId === category.GroupId;
          })));
      }));
  }

  getFeaturedProducts() {
    this.featuredProducts$ = this.currentFeaturedProductsCategory$
      .pipe(switchMap(category => {
        return this.shopStateService.getProducts$()
          .pipe(map(products => products.filter(product => {
            return +product.ProductsWebGroups_GroupId === category.GroupId;
          })));
      }));
  }
  
  selectFeaturedProductsCategory(category: ProductCategory) {
    this.currentFeaturedProductsCategory$.next(category);
  }

  selectNewArrivalsCategory(category: ProductCategory) {
    this.currentNewArrivalsCategory$.next(category);
  }
}
