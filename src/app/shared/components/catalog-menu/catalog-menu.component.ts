import { Component, ElementRef, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, take, skip } from 'rxjs/operators';
import { ShopStateService } from './../../services/shop-state.service';
import { ShopingPageService } from './../../services/shoping-page.service';
import { ProductCategoryTree } from './../product-category-menu/product-category-menu.component';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent implements OnInit, OnDestroy {
  categories$: Observable<ProductCategoryTree[]> = this.shopState.getCategoriesForTree$();
  subscription$ = new Subject();
  @Output() hideCatalogMenu = new EventEmitter<void>();
  constructor(
    private shopState: ShopStateService,
    private shopingPageService: ShopingPageService,
    private router: Router,
    private _eref: ElementRef,

  ) { }

  ngOnInit(): void {
    const click$ = fromEvent(document, 'click');

    click$.pipe(
      skip(1),
      takeUntil(this.subscription$)
    )
      .subscribe(e => {
        const isContain = this._eref.nativeElement.contains(e.target);
        if (!isContain) {
          this.onHideCatalog();
        }
        console.log(e, isContain);
      }, err => console.log(err),
        () => console.log('COMPLETED'));
  }

  setCategory(categoryId: number) {
    this.shopingPageService.setCategory(categoryId);
    this.onRedirectToShopPage(categoryId);
    this.onHideCatalog();

  }

  onRedirectToShopPage(categoryId: number) {
    this.router.navigate(['shoping-page'], { queryParams: { category: categoryId } });
  }

  onHideCatalog() {
    this.hideCatalogMenu.emit();
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
