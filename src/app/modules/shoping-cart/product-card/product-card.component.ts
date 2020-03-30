import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product, ProductInCart } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnChanges {
  @Input() product: ProductInCart;
  @Output() showInfo = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @Output() increase = new EventEmitter();
  @Output() changeQuantity = new EventEmitter();


  quantity: FormControl = new FormControl('');

  constructor() { }

  ngOnChanges() {
    this.quantity.patchValue(this.product.quantity);
  }

  onShowProductInfo() {
    this.showInfo.emit();
  }

  onRemoveFromCart() {
    this.removeFromCart.emit();
  }

  onIncrease() {
    this.quantity.patchValue(+this.quantity.value + 1);
    this.onChange(this.quantity.value);

  }
  onDecrease() {
    if (this.quantity.value !== 1) {
      this.quantity.patchValue(+this.quantity.value - 1);
      this.onChange(this.quantity.value);
    }

  }

  onChange(quantity: number) {
    this.changeQuantity.emit(quantity);
  }
}
