import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/shoping-page' },
  { path: 'shoping-page', loadChildren: () => import('./modules/shoping-page/shoping-page.module').then(m => m.ShopingPageModule) },
  { path: 'shoping-cart', loadChildren: () => import('./modules/shoping-cart/shoping-cart.module').then(m => m.ShopingCartModule) },
  { path: 'product-info/:id', loadChildren: () => import('./modules/product-info/product-info.module').then(m => m.ProductInfoModule) },
  { path: 'payment', loadChildren: () => import('./modules/customer-info/customer-info.module').then(m => m.CustomerInfoModule) }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
