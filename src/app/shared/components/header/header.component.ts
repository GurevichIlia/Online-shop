import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() addedProductsQuantity = 0;
  @Output() openShopingCart = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onShopingCart() {
    this.openShopingCart.emit();
  }
}
