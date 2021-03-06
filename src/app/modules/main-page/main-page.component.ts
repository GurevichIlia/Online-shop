import { MainPageService, MainBannerImage, MainBannerImages, TopImages } from './../../shared/services/main-page.service';
import { GeneralService } from './../../shared/services/general.service';
import { Router } from '@angular/router';
import { ProductCategory, Product, ProductsWebImageGallery } from './../../shared/interfaces';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, switchMap, map, filter, debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  // productCategories$: Observable<ProductCategory[]>;
  featuredProductsCategories$: Observable<ProductCategory[]>;
  newProductsCategories$: Observable<ProductCategory[]>;

  currentFeaturedProductsCategory$: Observable<ProductCategory>;
  currentNewArrivalsCategory$: Observable<ProductCategory>;

  featuredProducts$: Observable<Product[][]>;
  newArrivalsProducts$: Observable<Product[][]>;
  isMobileView$: Observable<boolean>;

  mainBannerImages$: Observable<MainBannerImages>;

  imagesForTop$: Observable<TopImages>;

  imagesForCarousel$: Observable<{}>;
  imagesForFastShop$: Observable<{}>;

  constructor(
    private shopStateService: ShopStateService,
    private router: Router,
    private generalService: GeneralService,
    private mainPageService: MainPageService
  ) {

  }

  ngOnInit(): void {

    this.newProductsCategories$ = this.mainPageService.detectIsNewProductsCategories()
      .pipe(
        tap(categories => this.selectNewArrivalsCategory(categories[0]))
      );

    this.featuredProductsCategories$ = this.mainPageService.detectFeaturedProductsCategories()
      .pipe(
        tap(categories => this.selectFeaturedProductsCategory(categories[0]))
      );

    this.currentFeaturedProductsCategory$ = this.mainPageService.getCurrentFeaturedProductsCategory$();
    this.currentNewArrivalsCategory$ = this.mainPageService.getCurrentNewArrivalsCategory$();

    this.isMobileView$ = this.generalService.isMobileView$();

    this.mainBannerImages$ = this.mainPageService.getMainBannerImages();
    this.getGalleryImages();



    this.getNewArrivalsProducts();
    this.getFeaturedProducts();

  }

  getNewArrivalsProducts() {
    this.newArrivalsProducts$ = this.mainPageService.getNewProducts(this.currentNewArrivalsCategory$).pipe(debounceTime(1));;
  }

  getFeaturedProducts() {
    this.featuredProducts$ = this.mainPageService.getFeaturedProducts(this.currentFeaturedProductsCategory$).pipe(debounceTime(1));

  }

  selectFeaturedProductsCategory(category: ProductCategory) {
    this.mainPageService.currentFeaturedProductsCategory$.next(category);
  }

  selectNewArrivalsCategory(category: ProductCategory) {
    this.mainPageService.currentNewArrivalsCategory$.next(category);
  }

  addToShopingCart(product: Product) {
    this.shopStateService.addToCart(product);
  }

  // removeFromCart(product: Product) {
  //   this.shopStateService.removeFromCart(product);
  // }

  showProductFullInfo(product: Product) {
    const id = product.ProductId;
    this.router.navigate([`product-info/${id}`]);
  }

  getGalleryImages() {
    this.imagesForTop$ = this.mainPageService.getImagesForTop();

    this.getImagesForCarousel();
    this.getImagesForFastShop();
  }

  getImagesForCarousel() {
    this.imagesForCarousel$ = this.mainPageService.getImagesForCarousel();
  }

  getImagesForFastShop() {
    this.imagesForFastShop$ = this.mainPageService.getImagesForFastShop();
  }
}
