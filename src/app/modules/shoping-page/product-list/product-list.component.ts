import { Product } from './../../../shared/interfaces';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface Tile {
  cols: number;
  rows: number;

}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() products: Product[];
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
}
