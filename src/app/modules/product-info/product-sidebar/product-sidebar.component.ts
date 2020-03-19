import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSidebarComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();
  @Output() buyNow = new EventEmitter();

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

  onBuyNow() {
    this.buyNow.emit();
  }
}
