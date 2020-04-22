import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Product, ProductInCart } from 'src/app/shared/interfaces';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSidebarComponent implements OnInit {
  @Input() product: ProductInCart;
  @Input() totalAmount: number;

  @Input()
  set quantity(productQuantity: number) {
    this._quantity.patchValue(productQuantity);
  }

  get quantity() {
    return this._quantity.value;
  }

  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();
  @Output() buyNow = new EventEmitter();
  @Output() decrease = new EventEmitter<number>();
  @Output() increase = new EventEmitter<number>();
  @Output() changeQuantity = new EventEmitter();

  addedButtonOnFocus = false;
  _quantity = new FormControl(1);
  constructor() { }

  ngOnInit(): void {
  }


  onAddToCart() {
    this.addToCart.emit();
  }

  onRemoveFromCard() {
    this.removeFromCart.emit();
  }

  onBuyNow() {
    this.buyNow.emit();
  }

  onIncrease() {
    this.increase.emit(+this.quantity);
  }

  onDecrease() {
    this.decrease.emit(+this.quantity);

  }

  // onChange(quantity: number) {
  //   this.changeQuantity.emit(quantity);
  // }
}
