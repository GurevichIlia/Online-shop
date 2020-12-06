import { ShopStateService } from './../../services/shop-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-payment-processing',
  templateUrl: './payment-processing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentProcessingComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopState: ShopStateService

  ) {
    const params: { res: 'error' | 'successful' } = this.route.snapshot.queryParamMap['params'];
    const orgName = this.shopState.getOrgName()
    if (params.res === 'error') {

      window.top.open(`https://${this.shopState.getOrgName()}.amax.co.il/payment/failed`, '_self');

      return;
    }
    window.top.open(`https://${this.shopState.getOrgName()}.amax.co.il/payment/successful`, '_self');

    // this.router.navigateByUrl(`https://${this.shopState.getOrgName()}.amax.co.il/payment/successful`);

  }


}
