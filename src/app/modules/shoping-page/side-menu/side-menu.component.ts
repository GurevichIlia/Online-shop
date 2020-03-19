import { ProductCategoryTree } from './../../../shared/components/product-category-menu/product-category-menu.component';
import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  @Input() categories: ProductCategoryTree[];
  @Input() selectedCategory: FormControl;
  // @Output()
  constructor() { }

  ngOnInit(): void {
  }

}
