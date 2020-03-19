import { CustomerInfoService, CustomerInfo } from './../../shared/services/customer-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private customerInfoService: CustomerInfoService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getFormState();

    this.form.valueChanges
      .pipe(debounceTime(5000),
       takeUntil(this.subscription$))
      .subscribe(() => {
        this.customerInfoService.setCustomerFormState(this.form.value);
      });
  }
  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      buildingNumber: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  updateForm(formValue: CustomerInfo) {
    this.form.patchValue({
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      email: formValue.email,
      buildingNumber: formValue.buildingNumber,
      street: formValue.street,
      country: formValue.street,
      city: formValue.city,
      zipCode: formValue.zipCode
    })
  }

  getFormState() {
    this.customerInfoService.getCustomerFormState()
      .pipe(takeUntil(this.subscription$))
      .subscribe(state => {
        this.updateForm(state);
      });
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
