import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();
  @Output() moreInfo = new EventEmitter();
  addedButtonOnFocus = false;
  constructor() { }

  ngOnInit(): void {

  }

  onAddToCart() {
    this.addToCart.emit();
  }

 

  onRemoveFromCard() {
    this.removeFromCart.emit();
  }

  onMoreInfo() {
    this.moreInfo.emit();
  }
}
