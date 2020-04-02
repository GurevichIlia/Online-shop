import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorPickerModule } from 'ngx-color-picker';


import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { MainBannerComponent } from './main-banner/main-banner.component';


@NgModule({
  declarations: [AddProductComponent, MainBannerComponent],
  imports: [
    ColorPickerModule,
    CommonModule,
    SharedModule,
    AddProductRoutingModule
  ]
})
export class AddProductModule { }
