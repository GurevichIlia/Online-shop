import { ProductCategoryTree } from './../product-category-menu/product-category-menu.component';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  @Input() categories: ProductCategoryTree[];

  @Output() openShopingCart = new EventEmitter();
  @Output() selectTheme = new EventEmitter();
  @Output() showMobileMenu = new EventEmitter();
  @Output() redirect = new EventEmitter();

dropDownMenuBackcolor
  isMobileSearch = false;
  themes = [{ name: 'orange-theme' }, { name: 'blue-theme' }, { name: 'default-theme' }];
  isStickyNumbar$ = fromEvent(document, 'scroll').pipe(map(() => window.pageYOffset > 266));
  constructor() { }

  ngOnInit(): void {

    // pageYOffset$.subscribe(res => console.log('EVENT SCROLL', window.pageYOffset))
  }
  redirectToProductsList() {
    this.redirect.emit();
  }

  onShopingCart() {
    this.openShopingCart.emit();
  }

  onSelectTheme(theme: string) {
    this.selectTheme.emit(theme);
  }

  onShowMobileMenu() {
    this.showMobileMenu.emit();
  }
}
