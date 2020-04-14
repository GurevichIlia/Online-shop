import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Product } from 'src/app/shared/interfaces';
import { Observable, combineLatest } from 'rxjs';
import { ProductInfoService } from './../../shared/services/product-info.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { ShopStateService } from './../../shared/services/shop-state.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  product$: Observable<Product>;
  currentPhotoIndex = 0;
  // quantityPhotos: number;
  constructor(
    private route: ActivatedRoute,
    private shopStateService: ShopStateService,
    private productInfoService: ProductInfoService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.product$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) =>
        combineLatest(
          [this.shopStateService.getProduct$(+params.get('id')),
          this.productInfoService.getProductsFiles(+params.get('id'))]
        )),
        map(([product, productFiles]) => {
          const transformedProduct = { ...product, files: productFiles };
          return transformedProduct;
        }),
        tap(product => this.selectMainImageWhenProductInitial(product)),
        tap(product => console.log('PRODUCT', product))
      );

  }

  selectMainImageWhenProductInitial(product: Product) {
    const imageIndex = product.files.findIndex(file => product.MainWebImageName === file.FullName);
    this.onSelectImage(imageIndex);
  }


  onSelectImage(index: number) {
    this.currentPhotoIndex = index;
  }

  onPreviousImage(photosArrayLength: number) {
    this.currentPhotoIndex = this.productInfoService.onPreviousImage(this.currentPhotoIndex, photosArrayLength - 1);

  }

  onNextImage(photosArrayLength: number) {
    this.currentPhotoIndex = this.productInfoService.onNextImage(this.currentPhotoIndex, photosArrayLength - 1);
  }

  addToShopingCart(product: Product) {
    this.shopStateService.addToCart(product);
    console.log('ADD TO CART', product);

  }

  onBuyNow(product: Product) {
    this.openShopingCart();
    this.addToShopingCart(product);
  }

  openShopingCart() {
    this.router.navigate(['shoping-cart']);
  }

  removeFromCart(product: Product) {
    this.shopStateService.removeFromCart(product);
    console.log('REMOVE CART', product);

  }
}
