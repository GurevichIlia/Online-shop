import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StyleConfig, StyleConfigService } from 'src/app/core/style-config/style-config';
import { ProductCategory } from '../../interfaces';
import { ShopingPageService } from './../../services/shoping-page.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface ProductCategoryTree extends ProductCategory {
  children?: ProductCategoryTree[];
}


@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryMenuComponent implements OnChanges, OnInit {
  @Input() categoriesTree: ProductCategoryTree[];
  @Input() backgroudColor = 'white';

  treeControl = new NestedTreeControl<ProductCategoryTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ProductCategoryTree>();
  selectedProductCategory$: Observable<number>;
  @Output() redirect = new EventEmitter();

  styles$: Observable<StyleConfig> = this.styleConfigService.getStyles()

  constructor(
    private shopingPageService: ShopingPageService,
    private router: Router,
    private styleConfigService: StyleConfigService

  ) {
  }

  ngOnInit() {
    this.selectedProductCategory$ = this.shopingPageService.getSelectedCategory$();

  }

  ngOnChanges() {
    this.dataSource.data = this.categoriesTree;
    if (this.dataSource.data && this.dataSource.data.length !== 0) {
      this.treeControl.dataNodes = this.dataSource.data;
      this.treeControl.expandAll();

    }

  }

  setCategory(categoryId: number) {
    console.log('SELECTED CATEGORY', categoryId);
    this.shopingPageService.setCategory(categoryId);
    this.router.navigate(['shoping-page'], { queryParams: { category: categoryId } });
  }

  // onRedirect() {
  //   this.redirect.emit();
  // }

  hasChild = (_: number, node: ProductCategoryTree) => !!node.children && node.children.length > 0;
}
