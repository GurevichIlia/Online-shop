import { ShopStateService } from './../../services/shop-state.service';
import { PaymentService } from './../../services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ParamsAfterPayment } from '../../interfaces';



@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.component.html',
  styleUrls: ['./successful-payment.component.scss']
})
export class SuccessfulPaymentComponent implements OnInit {
  params: ParamsAfterPayment;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private shopState: ShopStateService
  ) {
    const params: ParamsAfterPayment = this.route.snapshot.queryParamMap['params'];
    const parentLocation = parent.location.href.substring(0, parent.location.href.indexOf('?'));
    if (parentLocation !== `https://${this.shopState.getOrgName()}.amax.co.il/payment/successful`) {
      // this.router.navigateByUrl('http://localhost:4200/payment/successful')
      //  .navigate(['payment/successful']);
      // tslint:disable-next-line: max-line-length
      parent.location.href = `https://${this.shopState.getOrgName()}.amax.co.il/payment/successful?terminalnumber=${params.terminalnumber}&lowprofilecode=${params.lowprofilecode}&ResponeCode=${params.ResponseCode}&Operation=${params.Operation}&ResponseCode=${params.ResponseCode}&Status=${params.Status}`;
      return;
    }
    this.paymentService.setParams(params);
    this.params = this.paymentService.getParams();
    console.log('PARAMS', this.params);
  }

  ngOnInit(): void {

  }


  toShop() {
    this.router.navigate(['/shoping-page']);
  }
}
