import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, fromEvent } from 'rxjs';
import { filter, tap, map, debounceTime } from 'rxjs/operators';
import { PaymentService } from './../../shared/services/payment.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef;
  paymentLink$: Observable<SafeUrl>;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    window.scrollTo({ top: 0 });
    this.paymentLink$ = this.paymentService.getPaymentLink()
      .pipe(debounceTime(1), tap(link => link ? link : this.router.navigate(['/shoping-page'])));


  }



  ngAfterViewInit() {


  }


  showIframe() {
    console.log(this.iframe.nativeElement.contentWindow)
    console.log(' IFRAME', this.iframe.nativeElement);

  }
}
