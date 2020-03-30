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


  selectNewArrivalsCategory(category: ProductCategory) {
    this.selectCategory.emit(category);
  }

}
