import { ShopingPageComponent } from './shoping-page.component';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

const shopingPageRoutes: Routes = [
  { path: '', component: ShopingPageComponent }
];

@NgModule({
  declarations: [
    ShopingPageComponent,
    ProductListComponent,
    SideMenuComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(shopingPageRoutes)
  ]
})
export class ShopingPageModule { }
