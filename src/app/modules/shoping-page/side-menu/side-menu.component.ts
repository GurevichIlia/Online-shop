import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductCategoryTree } from './../../../shared/components/product-category-menu/product-category-menu.component';

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


  ngOnInit(): void {
  }

}
