import { ShippingMethod } from './../../interfaces';
import { Product, ProductInCart } from 'src/app/shared/interfaces';
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {
  @Input() orderedProductsAmount: number;
  @Input() orderedProducts: ProductInCart[] = [];
  @Input() extraOption: ShippingMethod;
  @Input() numberOfPayments = 0;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor() { }

  onEdit() {
    this.edit.emit();
  }

  onDelete(product: Product) {
    this.delete.emit(product);
  }

}
