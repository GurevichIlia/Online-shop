import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ParamsAfterPayment } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paramsAfterPayment: ParamsAfterPayment;
  paymentLink$ = new BehaviorSubject<SafeUrl>('');
  constructor(private sanitizer: DomSanitizer) { }


  setPaymentLink(link: string) {
    const url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    this.paymentLink$.next(url);
  }

  getPaymentLink() {
    return this.paymentLink$.asObservable();
  }

  getParams() {
    return this.paramsAfterPayment;
  }

  setParams(params: ParamsAfterPayment) {
    this.paramsAfterPayment = params;
  }
}
