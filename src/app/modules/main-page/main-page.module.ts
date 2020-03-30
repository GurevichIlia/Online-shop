import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { MainBannerComponent } from './main-banner/main-banner.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { FastShopComponent } from './fast-shop/fast-shop.component';

@NgModule({
  declarations: [
    FastShopComponent,
    FeaturedProductsComponent,
    NewArrivalsComponent,
    MainBannerComponent,
    MainPageComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
