import { MainPageService, MainBannerImage, MainBannerImages } from './../../shared/services/main-page.service';
import { GeneralService } from './../../shared/services/general.service';
import { Router } from '@angular/router';
import { ProductCategory, Product, ProductsWebImageGallery } from './../../shared/interfaces';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;
  currentFeaturedProductsCategory$: Observable<ProductCategory>;
  currentNewArrivalsCategory$: Observable<ProductCategory>;

  featuredProducts$: Observable<Product[][]>;
  newArrivalsProducts$: Observable<Product[][]>;
  isMobileView$: Observable<boolean>;

  mainBannerImages$: Observable<MainBannerImages>;

  mainPageImages$: Observable<ProductsWebImageGallery>;

  imagesForCarousel$: Observable<{}>;
  imagesForFastShop$: Observable<{}>;
  constructor(
    private shopStateService: ShopStateService,
    private router: Router,
    private generalService: GeneralService,
    private mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    this.productCategories$ = this.shopStateService.getCategories$();

    this.isMobileView$ = this.generalService.isMobileView$();

    this.mainBannerImages$ = this.mainPageService.getMainBannerImages();
    this.getGalleryImages();

    this.currentFeaturedProductsCategory$ = this.mainPageService.getCurrentFeaturedProductsCategory$();
    this.currentNewArrivalsCategory$ = this.mainPageService.getCurrentNewArrivalsCategory$();

    this.getNewArrivalsProducts();
    this.getFeaturedProducts();

  }

  getNewArrivalsProducts() {
    this.newArrivalsProducts$ = this.mainPageService.getNewProducts(this.currentNewArrivalsCategory$);
  }

  getFeaturedProducts() {
    this.featuredProducts$ = this.mainPageService.getFeaturedProducts(this.currentFeaturedProductsCategory$);

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

  removeFromCart(product: Product) {
    this.shopStateService.removeFromCart(product);
  }

  showProductFullInfo(product: Product) {
    const id = product.ProductId;
    this.router.navigate([`product-info/${id}`]);
  }

  getGalleryImages() {
    this.mainPageImages$ = this.mainPageService.getGalleryImages().pipe(map(images => images[0]), tap(x => console.log('IMAGES', x)));
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
