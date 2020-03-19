import { ProductInfoService } from './../../shared/services/product-info.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces';
import { Observable, from } from 'rxjs';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  product$: Observable<Product>;
  currentPhotoIndex = 0;
  quantityPhotos: number;
  constructor(
    private route: ActivatedRoute,
    private shopStateService: ShopStateService,
    private productInfoService: ProductInfoService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.product$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) =>
        this.shopStateService.getProduct$(+params.get('id'))),
        tap(product => this.quantityPhotos = product.images.length - 1));

  }

  onPreviousImage() {
    this.currentPhotoIndex = this.productInfoService.onPreviousImage(this.currentPhotoIndex, this.quantityPhotos);

  }

  onNextImage() {
    this.currentPhotoIndex = this.productInfoService.onNextImage(this.currentPhotoIndex, this.quantityPhotos);
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
