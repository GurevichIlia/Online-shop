import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInfoComponent } from './payment-info.component';
import { Routes, RouterModule } from '@angular/router';
import { SuccessfulPaymentComponent } from 'src/app/shared/components/successful-payment/successful-payment.component';
import { FailedPaymentComponent } from 'src/app/shared/components/failed-payment/failed-payment.component';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  { path: '', component: PaymentInfoComponent },
  { path: 'successful', component: SuccessfulPaymentComponent },
  { path: 'failed', component: FailedPaymentComponent },
]

@NgModule({
  declarations: [PaymentInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentInfoModule { }
