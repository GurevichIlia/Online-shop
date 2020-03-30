import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-failed-payment',
  templateUrl: './failed-payment.component.html',
  styleUrls: ['./failed-payment.component.scss']
})
export class FailedPaymentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {


    if (parent.location.href !== 'http://localhost:4200/payment/failed') {
      this.paymentService.setParams(this.route.snapshot.queryParamMap['params']);

      parent.location.href = 'http://localhost:4200/payment/failed';

    }
  }

}
