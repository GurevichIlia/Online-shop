import { ProductComponent } from './../modules/shoping-page/product/product.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductComponent as DetailProductComponent } from './components/order-details/product/product.component';
import { TotalPriceComponent } from './components/order-details/total-price/total-price.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { TableComponent } from './components/table/table.component';
import { SuccessfulPaymentComponent } from './components/successful-payment/successful-payment.component';
import { FailedPaymentComponent } from './components/failed-payment/failed-payment.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';

import { DetectChangeDirective } from './directives/detect-change.directive';
import { ChangeThemeDirective } from './directives/change-theme.directive';



import { CommonModule } from '@angular/common';
import { CarouselModule } from 'angular-bootstrap-md';
import { TranslateModule } from '@ngx-translate/core';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { GetLinkPipe } from './pipes/get-link.pipe';
import { SearchComponent } from './components/search/search.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { SecuryLinkPipe } from './guards/secury-link.pipe';
import { PaymentProcessingComponent } from './components/payment-processing/payment-processing.component';
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';
import { DirectivesModule } from './directives/directives.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';





@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    ProductCategoryMenuComponent,
    DetectChangeDirective,
    OrderDetailsComponent,
    DetailProductComponent,
    TotalPriceComponent,
    ChangeThemeDirective,
    CarouselComponent,
    SuccessfulPaymentComponent,
    FailedPaymentComponent,
    ProductComponent,
    ProductsCarouselComponent,
    BannerListComponent,
    GetLinkPipe,
    SearchComponent,
    MobileMenuComponent,
    SecuryLinkPipe,
    PaymentProcessingComponent,
    CatalogMenuComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule,
    TranslateModule.forChild(),
    DirectivesModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule,
    TranslateModule,

    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    ProductCategoryMenuComponent,
    TotalPriceComponent,
    CarouselComponent,
    SuccessfulPaymentComponent,
    FailedPaymentComponent,
    ProductComponent,
    DetailProductComponent,
    ProductsCarouselComponent,
    BannerListComponent,
    CatalogMenuComponent,

    ChangeThemeDirective,
    DetectChangeDirective,

    GetLinkPipe,
    SecuryLinkPipe,

  ]
})
export class SharedModule { }
