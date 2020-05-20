import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInCart } from '../interfaces';

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
    firstName: '',
    lastName: '',
    receiptName: '',
    cellphone: '',
    email: '',
    buildingNumber: '',
    street: '',
    floor: '',
    flat: '',
    city: '',
    zipCode: ''


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
  // Delete because there is problem when try to save on the server
  removeFilesFromProductCard(products: ProductInCart[]) {
    return products.map(product => {
      const newProduct = { ...product };
      delete newProduct.files;

      return newProduct;
    });
  }
}
