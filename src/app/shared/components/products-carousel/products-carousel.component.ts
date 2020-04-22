import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Product, ProductCategory } from '../../interfaces';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class ProductsCarouselComponent {

  @Input() products: Product[];
  @Input() productCategories: ProductCategory[];
  @Input() selectedCategory: ProductCategory;

  @Output() selectCategory = new EventEmitter<ProductCategory>();
  @Output() addToCart = new EventEmitter();
  @Output() moreInfo = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();

  trackByFn(index, item) {
    return index; // or item.id
  }

  onAddToCart(product: Product) {
    this.addToCart.emit(product);
  }

  onMoreInfo(product: Product) {
    this.moreInfo.emit(product);
  }

  onRemoveFromCart(product: Product) {
    this.removeFromCart.emit(product);

  }
  selectFeaturedProductsCategory(category: ProductCategory) {
    this.selectCategory.emit(category);
  }

}

