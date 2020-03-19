import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  buildingNumber: string;
  street: string;
  country: string;
  city: string;
  zipCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  initialFormValue = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    buildingNumber: '',
    street: '',
    country: '',
    city: '',
    zipCode: ''


  };

  customerFormState$ = new BehaviorSubject<CustomerInfo>(this.initialFormValue);
  constructor() { }

  setCustomerFormState(formValue: CustomerInfo) {
    this.customerFormState$.next(formValue)
  }

  getCustomerFormState() {
    return this.customerFormState$.asObservable();
  }
}
