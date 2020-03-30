import { Option } from './../../../services/shoping-cart.service';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalPriceComponent implements OnInit {
  @Input() extraOptionSelected: Option;
  @Input() totalProductsAmount: number;
  constructor() { }

  ngOnInit(): void {
  }

}
