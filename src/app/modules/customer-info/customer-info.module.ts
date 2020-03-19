import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from './customer-info.component';
import { InfoFormComponent } from './info-form/info-form.component';
import { RouterModule, Routes } from '@angular/router';

type NewType = Routes;

const infoRoutes: NewType = [
  { path: '', component: CustomerInfoComponent }
]

@NgModule({
  declarations: [
    CustomerInfoComponent,
    InfoFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(infoRoutes)
  ]
})
export class CustomerInfoModule { }
