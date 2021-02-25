import { HomeComponent } from './shared/components/home/home.component';
import { ShopStateService } from './shared/services/shop-state.service';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyCartGuard } from './shared/guards/empty-cart.guard';
import { PaymentProcessingComponent } from './shared/components/payment-processing/payment-processing.component';
import { AppSettingsResolver } from './core/resolvers/app-settings.resolver';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'main-page' },
      { path: 'main-page', loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule) },
      { path: 'shoping-page', loadChildren: () => import('./modules/shoping-page/shoping-page.module').then(m => m.ShopingPageModule) },
      { path: 'shoping-cart', loadChildren: () => import('./modules/shoping-cart/shoping-cart.module').then(m => m.ShopingCartModule) },
      { path: 'product-info/:id', loadChildren: () => import('./modules/product-info/product-info.module').then(m => m.ProductInfoModule) },
      {
        path: 'customer-info', loadChildren: () => import('./modules/customer-info/customer-info.module').then(m => m.CustomerInfoModule),
        canActivate: [EmptyCartGuard]
      },
      {
        path: 'payment', loadChildren: () => import('./modules/payment-info/payment-info.module').then(m => m.PaymentInfoModule),
      },
    ],
    resolve: { appSettings: AppSettingsResolver }
  },
  { path: 'payment-processing', component: PaymentProcessingComponent },

  { path: '**', redirectTo: '/main-page' },



  // { path: 'add-products', loadChildren: () => import('./modules/add-product/add-product.module').then(m => m.AddProductModule) },

  { path: '**', redirectTo: '' },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
