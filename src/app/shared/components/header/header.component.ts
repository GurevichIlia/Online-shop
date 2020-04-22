import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() addedProductsQuantity = 0;
  @Input() isShowMenu;
  @Input() logo: string;
  @Output() openShopingCart = new EventEmitter();
  @Output() selectTheme = new EventEmitter();
  isMobileSearch = false;
  themes = [{ name: 'orange-theme' }, { name: 'blue-theme' }, { name: 'default-theme' }];
  constructor() { }

  ngOnInit(): void {
  }

  onShopingCart() {
    this.openShopingCart.emit();
  }

  onSelectTheme(theme: string) {
    this.selectTheme.emit(theme);
  }
}
