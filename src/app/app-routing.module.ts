
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main-page' },
  { path: 'main-page',loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule) },
  { path: 'shoping-page', loadChildren: () => import('./modules/shoping-page/shoping-page.module').then(m => m.ShopingPageModule) },
  { path: 'shoping-cart', loadChildren: () => import('./modules/shoping-cart/shoping-cart.module').then(m => m.ShopingCartModule) },
  { path: 'product-info/:id', loadChildren: () => import('./modules/product-info/product-info.module').then(m => m.ProductInfoModule) },
  { path: 'customer-info', loadChildren: () => import('./modules/customer-info/customer-info.module').then(m => m.CustomerInfoModule) },
  { path: 'payment', loadChildren: () => import('./modules/payment-info/payment-info.module').then(m => m.PaymentInfoModule) },
  { path: 'add-products', loadChildren: () => import('./modules/add-product/add-product.module').then(m => m.AddProductModule) },


  { path: '**', redirectTo: '/main-page' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
