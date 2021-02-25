import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ProductInCart } from 'src/app/shared/interfaces';
import { StyleConfig, StyleConfigService } from './../../../core/style-config/style-config';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSidebarComponent implements OnInit {
  @Input() product: ProductInCart;
  @Input() totalAmount: number;
  @Input() productPrice: number;

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
  styles$: Observable<StyleConfig> = this.styleConfigService.getStyles()
  constructor(
    private styleConfigService: StyleConfigService
  ) { }

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
