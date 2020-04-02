import { MainPageService, MainBannerImage, MainBannerImages } from './../../shared/services/main-page.service';
import { GeneralService } from './../../shared/services/general.service';
import { Router } from '@angular/router';
import { ProductCategory, Product, ProductsWebImageGallery } from './../../shared/interfaces';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]>;
  currentFeaturedProductsCategory$ = new BehaviorSubject<ProductCategory>({} as ProductCategory);
  currentNewArrivalsCategory$ = new BehaviorSubject<ProductCategory>({} as ProductCategory);

  featuredProducts$: Observable<Product[][]>;
  newArrivalsProducts$: Observable<Product[][]>;
  isMobileView$: Observable<boolean>;

  mainBannerImages$: Observable<MainBannerImages>;

  mainPageImages$: Observable<ProductsWebImageGallery>;

  imagesForCarousel$: Observable<{}>;
  imagesForFastShop$: Observable<{}>
  constructor(
    private shopStateService: ShopStateService,
    private router: Router,
    private generalService: GeneralService,
    private mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    this.productCategories$ = this.shopStateService.getCategories$();

    this.getNewArrivalsProducts();
    this.getFeaturedProducts();
    this.isMobileView$ = this.generalService.isMobileView$();

    this.mainBannerImages$ = this.mainPageService.getMainBannerImages();
    this.getGalleryImages();

  }

  getNewArrivalsProducts() {
    this.newArrivalsProducts$ = this.mainPageService.getCurrentProducts(this.currentNewArrivalsCategory$);
  }

  getFeaturedProducts() {
    this.featuredProducts$ = this.mainPageService.getCurrentProducts(this.currentFeaturedProductsCategory$);
  }

  selectFeaturedProductsCategory(category: ProductCategory) {
    this.currentFeaturedProductsCategory$.next(category);
  }

  selectNewArrivalsCategory(category: ProductCategory) {
    this.currentNewArrivalsCategory$.next(category);
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
