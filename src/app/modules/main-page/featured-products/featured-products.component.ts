import { ProductCategory, Product } from 'src/app/shared/interfaces';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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


  selectFeaturedProductsCategory(category: ProductCategory) {
    this.selectCategory.emit(category);
  }

}
