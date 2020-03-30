import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  receiptName?: string;
  cellphone: string;
  email: string;
  buildingNumber: string;
  street: string;
  flat: string;
  floor: string;
  city: string;
  zipCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  initialFormValue: CustomerInfo = {
    firstName: 'test',
    lastName: 'test',
    receiptName: 'test',
    cellphone: 'test',
    email: 'test@test.com',
    buildingNumber: 'test',
    street: 'test',
    floor: 'test',
    flat: 'test',
    city: 'test',
    zipCode: 'test'


  };

  customerFormState$ = new BehaviorSubject<CustomerInfo>({ ...this.initialFormValue });
  constructor() { }

  setCustomerFormState(formValue: CustomerInfo) {
    this.customerFormState$.next(formValue);
  }

  getCustomerFormState() {
    return this.customerFormState$.asObservable();
  }

  refreshFormState() {
    this.setCustomerFormState({ ...this.initialFormValue });
  }
}
