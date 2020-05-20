import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductsWebImageGallery, ImageForCarousel, ImageKey, GetProductsWebImageGallery } from 'src/app/shared/interfaces';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, tap, filter, shareReplay, pluck } from 'rxjs/operators';
import { GeneralService } from './general.service';
import { ShopStateService } from './shop-state.service';

export interface MainBannerImage {
  image: string;
  title: string;
  subtitle: string;
  content: string;
  link: string;
  textColor: string;
}

export interface MainBannerImages {
  carouselImages: MainBannerImage[];
  images: MainBannerImage[];
}

export interface TransformedImage<T> {
  ImageLink: string;
  ImageName1: string;
  SortOrder1: number;
  link: string;
}

export interface TopImages {
  TopImage1: string;
  TopImage1Link: string;
  link1: string;
  TopImage2: string;
  TopImage2Link: string;
  link2: string;

}


@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  initialMainBannerImages: MainBannerImages = {
    carouselImages: [],
    images: []
  };

  mainBannerImages$ = new BehaviorSubject<MainBannerImages>(this.initialMainBannerImages);

  initialCategory: ProductCategory = {
    GroupId: 0,
    GroupName: 'All',
    GroupNameEng: 'All',
    GroupParenCategory: 0,
    isHide: false,
    instituteId: 153
  };

  currentFeaturedProductsCategory$ = new BehaviorSubject<ProductCategory>(this.initialCategory);
  currentNewArrivalsCategory$ = new BehaviorSubject<ProductCategory>(this.initialCategory);

  allImages$: Observable<ProductsWebImageGallery> = of(null);
  constructor(
    private shopStateService: ShopStateService,
    private generalService: GeneralService,
    private localStorageService: LocalStorageService,
    private apiService: ApiService
  ) {

    const imagesForMainBanner = this.localStorageService.getItem('main-banners')
      ? this.localStorageService.getItem('main-banners')
      : this.initialMainBannerImages;
    this.mainBannerImages$.next(imagesForMainBanner);
    console.log('IMAGES', imagesForMainBanner);
  }

  getCurrentFeaturedProductsCategory$() {
    return this.currentFeaturedProductsCategory$.asObservable();
  }

  getCurrentNewArrivalsCategory$() {
    return this.currentNewArrivalsCategory$.asObservable();

  }

  transformProductsForDesktopSlider(products: Product[]) {
    if (!products) {
      return;
    }
    const mockProducts = [...products];
    let newProducts: Product[][] = [];
    let productsPack: Product[] = [];
    mockProducts.map(existProduct => {
      productsPack.push(existProduct);
      if (productsPack.length === 4) {
        newProducts.push(productsPack);
        productsPack = [];
      } else if (mockProducts.indexOf(existProduct) === mockProducts.length - 1) {
        newProducts.push(productsPack);
        productsPack = [];
      }
      return existProduct;
    });

    return newProducts;

  }

  getCurrentProductsFilteredByCategory(currentCategory$: Observable<ProductCategory>): Observable<Product[]> {
    return currentCategory$
      .pipe(
        switchMap(category => {
          return this.shopStateService.getProductsFilteredByCategory$(category.GroupId)
        }
        )
        // .pipe(
        //   filter(products => products !== undefined),
        //   map(products => this.generalService.filterByCategory(products, category.GroupId)


      );
  }

  getNewProducts(currentCategory$: Observable<ProductCategory>) {
    return this.getCurrentProductsFilteredByCategory(currentCategory$)
      .pipe(
        filter(products => products !== null && products !== undefined),
        map(products => products.filter(product => product.IsNewItem === '1')),
        switchMap(filteredProducts => this.transformForCarousel(filteredProducts)),
        // tap(transformedProducts => console.log('FILTERED NEW PRODUCTS', transformedProducts))
      );
  }

  getFeaturedProducts(currentCategory$: Observable<ProductCategory>) {
    return this.getCurrentProductsFilteredByCategory(currentCategory$)
      .pipe(
        map(products => products.filter(product => product.Isfeatured === '1')),
        switchMap(filteredProducts => this.transformForCarousel(filteredProducts)),
        // tap(transformedProducts => console.log('FILTERED FEATURED PRODUCTS', transformedProducts))
      );
  }

  transformForCarousel(products: Product[]) {
    return this.generalService.isMobileView$()
      .pipe(
        map(isMobileView =>
          isMobileView
            ? products.map(product => [product])
            : this.transformProductsForDesktopSlider(products)
        ));

  }



  // addMainBannerImage(image: MainBannerImage, bannerType: string) {
  //   const banner: MainBannerImages = {
  //     ...this.mainBannerImages$.getValue(),
  //     [bannerType]: [...this.mainBannerImages$.getValue()[bannerType], image]
  //   };
  //   console.log('PHOTO FOR MAIN BANNER', banner);

  //   this.localStorageService.setItem('main-banners', banner);
  //   this.mainBannerImages$.next(banner);
  // }

  public getMainBannerImages() {
    return this.mainBannerImages$.asObservable();
  }

  // onEditImage() {

  // }

  // onDeleteImage(id: number, bannerType: string) {
  //   const bannerTypeArray: MainBannerImage[] = [...this.mainBannerImages$.getValue()[bannerType]];
  //   bannerTypeArray.splice(id, 1);
  //   const banner: MainBannerImages = {
  //     ...this.mainBannerImages$.getValue(),
  //     [bannerType]: bannerTypeArray
  //   };
  //   console.log('PHOTO FOR MAIN BANNER', banner);

  //   this.localStorageService.setItem('main-banners', banner);
  //   this.mainBannerImages$.next(banner);

  // }

  // uploadLogoImage(logo: File) {
  //   return this.apiService.uploadGalleryLogo(logo);
  // }

  getGalleryImages() {

    return this.allImages$ = this.apiService.getGalleryImages(this.shopStateService.getOrgName())
      .pipe(
        // filter(images => images !== undefined),
        pluck('Data', 'GetProductsWebImageGallery', 0),
        shareReplay()
      );


  }



  getLogo() {
    // tslint:disable-next-line: max-line-length
    if (!this.getAllImages$()) {
      return;
    }
    return this.getAllImages$()
      .pipe(
        filter(images => images !== null && images !== undefined),
        map(images => this.generalService.getImageLink(images.OrgId, 'LogoFileName1', images.LogoFileName1))
      );
  }

  transformImagesObjectToArray(allImages: ProductsWebImageGallery, imageQuantity: number, imageNameKey: ImageKey): ImageForCarousel[] {
    if (!allImages) {
      return;
    }
    const imagesForCarousel = [];
    for (let x = 1; x <= imageQuantity; x++) {
      const image: ImageForCarousel = {
        [`${imageNameKey}${x}`]: allImages[`${imageNameKey}${x}`],
        [`SortOrder${x}`]: allImages[`SortOrder${x}`],
        [`ImageLink${x}`]: allImages[`ImageLink${x}`],
        link: this.generalService.getImageLink(allImages.OrgId, `${imageNameKey}${x}`, allImages[`${imageNameKey}${x}`])
      };

      if (allImages[`${imageNameKey}${x}`] && allImages[`${imageNameKey}${x}`] !== '0') {
        imagesForCarousel.push(image);

      }
    }

    return imagesForCarousel;

  }

  getImagesForCarousel() {
    if (!this.getAllImages$()) {
      return;
    }
    return this.getAllImages$()
      .pipe(
        map(images => this.transformImagesObjectToArray(images, 10, 'ImageName')),
        map(images => images.map(image => image)),
        // map(images => images.map(image => ({ ...image, link: `url(${image.link})` }))),
        tap(images => console.log('IMAGE FOR CAROUCEL', images))
      );
  }

  getImagesForFastShop() {
    if (!this.getAllImages$()) {
      return;
    }
    return this.getAllImages$()
      .pipe(
        map(images => this.transformImagesObjectToArray(images, 10, 'FooterImage')),
        tap(images => console.log('IMAGE FOR FastSHop', images))

      );
  }

  getImagesForTop(): Observable<TopImages> {
    if (!this.getAllImages$()) {
      return;
    }
    return this.getAllImages$()
      .pipe(
        map(images => ({
          TopImage1: images.TopImage1,
          TopImage1Link: images.TopImage1Link,
          link1: this.generalService.getImageLink(images.OrgId, 'TopImage1', images.TopImage1),

          TopImage2: images.TopImage2,
          TopImage2Link: images.TopImage2Link,
          link2: this.generalService.getImageLink(images.OrgId, 'TopImage2', images.TopImage2),

        })),
        tap(images => console.log('IMAGE FOR TOP', images))

      );
  }

  getAllImages$() {
    return this.allImages$.pipe(filter(images => images !== null && images !== undefined));
  }
}
