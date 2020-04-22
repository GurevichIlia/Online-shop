import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ProductCategory } from '../../interfaces';
import { Observable } from 'rxjs';
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
  treeControl = new NestedTreeControl<ProductCategoryTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ProductCategoryTree>();
  selectedProductCategory$: Observable<number>;

  constructor(private shopingPageService: ShopingPageService) {
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
  }

  hasChild = (_: number, node: ProductCategoryTree) => !!node.children && node.children.length > 0;
}
