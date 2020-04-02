import { ProductCategory, Product } from 'src/app/shared/interfaces';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FeaturedProductsComponent {
  @Input() products: Product[];
  @Input() productCategories: ProductCategory[];
  @Input() selectedCategory: ProductCategory;

  @Output() selectCategory = new EventEmitter<ProductCategory>();
  @Output() addToCart = new EventEmitter();
  @Output() moreInfo = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();


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
