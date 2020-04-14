import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShippingMethod } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalPriceComponent implements OnInit {
  @Input() extraOptionSelected: ShippingMethod;
  @Input() totalProductsAmount: number;
  constructor() { }

  ngOnInit(): void {
  }

}
