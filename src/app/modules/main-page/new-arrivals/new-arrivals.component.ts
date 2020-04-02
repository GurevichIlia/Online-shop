import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ProductCategory, Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArrivalsComponent {
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
  selectNewArrivalsCategory(category: ProductCategory) {
    this.selectCategory.emit(category);
  }

}
