import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChildren } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleConfig, StyleConfigService } from 'src/app/core/style-config/style-config';
import { ProductCategoryTree } from './../product-category-menu/product-category-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChildren('catalogMenu') catalogMenu: ElementRef;
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
  isShowCatalog = false;
  themes = [{ name: 'orange-theme' }, { name: 'blue-theme' }, { name: 'default-theme' }];
  isStickyNuvbar$ = fromEvent(document, 'scroll').pipe(map(() => window.pageYOffset > 266));
  styles$: Observable<StyleConfig> = this.styleService.getStyles()

  constructor(
    private styleService: StyleConfigService
  ) { }

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

  hideCatalog() {
    this.isShowCatalog = false;
    // debugger
    // console.log(this.catalogMenu.first.nativeElement, this.catalogMenu.last.nativeElement)
    // this.catalogMenu.first.nativeElement.style.display = 'none',
    //   this.catalogMenu.last.nativeElement.style.display = 'none'
  }
}
