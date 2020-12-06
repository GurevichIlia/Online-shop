import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductInCart } from '../interfaces';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  receiptName?: string;
  cellphone: string;
  email: string;
  buildingNumber: number;
  street: string;
  flat: number;
  floor: number;
  city: string;
  zipCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  // initialFormValue: CustomerInfo = {
  //   firstName: 'test',
  //   lastName: 'test',
  //   receiptName: 'test',
  //   cellphone: 'test',
  //   email: 'test@test.com',
  //   buildingNumber: 1,
  //   street: 'test',
  //   floor: 1,
  //   flat: 1,
  //   city: 'test',
  //   zipCode: 1


  // };
  initialFormValue: CustomerInfo = {
    firstName: '',
    lastName: '',
    receiptName: '',
    cellphone: '',
    email: '',
    buildingNumber: null,
    street: '',
    floor: null,
    flat: null,
    city: '',
    zipCode: null


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
