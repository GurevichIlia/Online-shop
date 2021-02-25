import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { StyleConfig, StyleConfigService } from 'src/app/core/style-config/style-config';
import { OrderInfo, ProductInCart } from 'src/app/shared/interfaces';
import { ApiService } from './../../shared/services/api.service';
import { CustomerInfo, CustomerInfoService } from './../../shared/services/customer-info.service';
import { GeneralService } from './../../shared/services/general.service';
import { NotificationsService } from './../../shared/services/notifications.service';
import { PaymentService } from './../../shared/services/payment.service';
import { ShopStateService } from './../../shared/services/shop-state.service';
import { ShopingCartService } from './../../shared/services/shoping-cart.service';








@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  totalPrice$: Observable<number>;
  totalPrice = 0;
  form: FormGroup;
  subscription$ = new Subject();
  isLoading = false;
  styles$: Observable<StyleConfig> = this.styleConfigService.getStyles()
  constructor(
    private fb: FormBuilder,
    private customerInfoService: CustomerInfoService,
    private apiService: ApiService,
    private router: Router,
    private paymentService: PaymentService,
    private generalService: GeneralService,
    private shopStateService: ShopStateService,
    private shopingCartService: ShopingCartService,
    private notifications: NotificationsService,
    private styleConfigService: StyleConfigService
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 100 });
    this.createForm();
    this.getFormState();

    this.form.valueChanges
      .pipe(debounceTime(5000),
        takeUntil(this.subscription$))
      .subscribe(() => {
        this.customerInfoService.setCustomerFormState(this.form.value);
      });

    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice$ = this.shopStateService.getAddedToCartProducts$()
      .pipe(switchMap((products: ProductInCart[]) => {
        const productsAmount = this.generalService.calculateProductAmount(products);
        return this.shopingCartService.getSelectedShipingOption()
          .pipe(
            map(option => option.ShippingPrice + productsAmount),
            tap(totalPrice => this.totalPrice = totalPrice));
      }));
  }

  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      receiptName: [''],
      cellphone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      buildingNumber: ['', Validators.required],
      street: ['', Validators.required],
      floor: ['', Validators.required],
      flat: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  updateForm(formValue: CustomerInfo) {
    this.form.patchValue({
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      receiptName: formValue.receiptName,
      cellphone: formValue.cellphone,
      email: formValue.email,
      buildingNumber: formValue.buildingNumber,
      street: formValue.street,
      floor: formValue.floor,
      flat: formValue.flat,
      city: formValue.city,
      zipCode: formValue.zipCode
    })
  }

  getFormState() {
    this.customerInfoService.getCustomerFormState()
      .pipe(
        takeUntil(this.subscription$)
      )
      .subscribe(state => {
        this.updateForm(state);
      });
  }

  saveOrderInfo(customerInfo: CustomerInfo = this.form.value) {
    if (this.form.invalid) {
      return;
    }

    const finalOrder$ = this.shopStateService.getAddedToCartProducts$();
    const shippingMethod$ = this.shopingCartService.getSelectedShipingOption();
    const numberOfPayments$ = this.shopingCartService.getNumberOfPayments();
    this.isLoading = true;
    combineLatest([finalOrder$, shippingMethod$, numberOfPayments$])
      .pipe(
        switchMap(([finalOrder, shippingMethod, numberOfPayments]) => {
          if (this.form.valid) {
            const orderInfo: OrderInfo = {
              firstName: customerInfo.firstName,
              lastName: customerInfo.lastName,
              receiptName: customerInfo.receiptName,
              cellphone: customerInfo.cellphone,
              email: customerInfo.email,
              buildingNumber: customerInfo.buildingNumber,
              street: customerInfo.street,
              floor: customerInfo.floor,
              flat: customerInfo.flat,
              city: customerInfo.city,
              zipCode: customerInfo.zipCode,
              kevaAmount: this.totalPrice,
              TotalMonthtoCharge: 0,
              numberOfPayments: +numberOfPayments,
              ShippingMethod: shippingMethod.Shippingid,
              order: this.customerInfoService.removeFilesFromProductCard(finalOrder)

            }
            console.log('FINAL ORDER', orderInfo)
            console.log('FINAL ORDER', JSON.stringify(orderInfo));

            return this.apiService.saveCustomerInfo(orderInfo, this.shopStateService.getShopGuid());
          }
        }),
        tap(res => this.isLoading = false),
        takeUntil(this.subscription$))
      .subscribe(response => {
        console.log('AFTER SAVE', response);
        if (response && response['IsError'] !== true) {
          const paymentUrl = response['Data'];
          if (paymentUrl && paymentUrl !== 'err') {
            this.paymentService.setPaymentLink(paymentUrl);
            this.router.navigate(['payment']);
          } else {
            this.notifications.error('Could save data. Please try again')
          }

        }
      }, err => this.notifications.error('Something went wrong', err.message));
  }


  goBack() {
    this.router.navigate(['/shoping-cart']);
  }

  openOrderDetails() {
    this.generalService.openOrderDetails();
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
