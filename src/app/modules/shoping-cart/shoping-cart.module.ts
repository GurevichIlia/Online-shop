import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingCartComponent } from './shoping-cart.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ExtraOptionsComponent } from './extra-options/extra-options.component';

const cartRoutes: Routes = [
  { path: '', component: ShopingCartComponent }
]

@NgModule({
  declarations: [
    ShopingCartComponent,
    ProductCardComponent,
    ExtraOptionsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(cartRoutes)
  ]
})
export class ShopingCartModule { }
