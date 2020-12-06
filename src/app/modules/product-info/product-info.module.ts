import { ProductImageComponent } from './product-image/product-image.component';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './product-info.component';
import { SharedModule } from './../../shared/shared.module';
import { OptionsListComponent } from './options-list/options-list.component';

const productInfoRoutes: Routes = [
  { path: '', component: ProductInfoComponent }
]

@NgModule({
  declarations: [
    ProductInfoComponent,
    ProductSidebarComponent,
    ProductImageComponent,
    OptionsListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(productInfoRoutes)
  ]
})
export class ProductInfoModule { }
