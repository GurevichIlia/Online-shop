import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Product, ProductCategory, ProductsWebImageGallery, ImageForCarousel, ImageKey } from 'src/app/shared/interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map, tap, filter, shareReplay } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  initialMainBannerImages: MainBannerImages = {
    carouselImages: [],
    images: []
  };

  mainBannerImages$ = new BehaviorSubject<MainBannerImages>(this.initialMainBannerImages);
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

  transformProductsForDesktopSlider(products: Product[]) {
    const mockProducts = [...products, ...products, ...products, ...products, ...products, ...products, ...products];
    let newProducts = [];
    let productsPack = [];
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

  getCurrentProducts(currentCategory$: Observable<ProductCategory>) {
    return currentCategory$
      .pipe(
        switchMap(category => {
          return this.shopStateService.getProducts$()
            .pipe(map(products => products.filter(product => {
              return +product.ProductsWebGroups_GroupId === category.GroupId;
            })),
              switchMap(products => {
                return this.generalService.isMobileView$()
                  .pipe(map(isMobile => isMobile ? products
                    .map(product => [product]) : this.transformProductsForDesktopSlider(products)));
              }), tap(products => console.log('FILTERED PRODUCTS', products)));
        }));
  }

  addMainBannerImage(image: MainBannerImage, bannerType: string) {
    const banner: MainBannerImages = {
      ...this.mainBannerImages$.getValue(),
      [bannerType]: [...this.mainBannerImages$.getValue()[bannerType], image]
    };
    console.log('PHOTO FOR MAIN BANNER', banner);

    this.localStorageService.setItem('main-banners', banner);
    this.mainBannerImages$.next(banner);
  }

  public getMainBannerImages() {
    return this.mainBannerImages$.asObservable();
  }

  onEditImage() {

  }

  onDeleteImage(id: number, bannerType: string) {
    const bannerTypeArray: MainBannerImage[] = [...this.mainBannerImages$.getValue()[bannerType]];
    bannerTypeArray.splice(id, 1);
    const banner: MainBannerImages = {
      ...this.mainBannerImages$.getValue(),
      [bannerType]: bannerTypeArray
    };
    console.log('PHOTO FOR MAIN BANNER', banner);

    this.localStorageService.setItem('main-banners', banner);
    this.mainBannerImages$.next(banner);

  }

  uploadLogoImage(logo: File) {
    return this.apiService.uploadGalleryLogo(logo);
  }

  getGalleryImages() {
    return this.apiService.getGalleryImages();
  }

  getImageLink(orgId: number, imageFolder: string, imageName: string) {
    // https://secure.amax.co.il/Upload/153P/LogoFileName1/logo.jpg // EXAMPLE
    const imageLink = `https://secure.amax.co.il/Upload/${orgId}P/${imageFolder}/${imageName}`;
    return imageLink;
  }

  getLogo() {
    return this.getGalleryImages().pipe(map(images => this.getImageLink(images[0].OrgId, 'LogoFileName1', images[0].LogoFileName1)))
  }

  transformImagesToArray(allImages: ProductsWebImageGallery, imageQuantity: number, imageNameKey: ImageKey): ImageForCarousel[] {
    const imagesForCarousel = [];
    for (let x = 1; x <= imageQuantity; x++) {
      const image: ImageForCarousel = {
        [`${imageNameKey}${x}`]: allImages[`${imageNameKey}${x}`],
        [`SortOrder${x}`]: allImages[`SortOrder${x}`],
        [`ImageLink${x}`]: allImages[`ImageLink${x}`],
        link: this.getImageLink(allImages.OrgId, `${imageNameKey}${x}`, allImages[`${imageNameKey}${x}`])
      };

      if (allImages[`${imageNameKey}${x}`] && allImages[`${imageNameKey}${x}`] !== '0') {
        imagesForCarousel.push(image);

      }
    }

    console.log('IMAGES FOR CAROUSEL', imagesForCarousel);
    return imagesForCarousel;

  }

  getImagesForCarousel() {
    return this.getGalleryImages()
      .pipe(map(images => this.transformImagesToArray(images[0], 10, 'ImageName')),
        // map(images => images.map(image => ({ ...image, link: `url(${image.link})` }))),
        tap(images => console.log('Transformed images', images))
      );
  }

  getImagesForFastShop() {
    return this.getGalleryImages()
      .pipe(map(images => this.transformImagesToArray(images[0], 10, 'FooterImage')));
  }
}
