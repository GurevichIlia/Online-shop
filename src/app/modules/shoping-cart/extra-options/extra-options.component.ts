import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { ShippingMethod } from 'src/app/shared/interfaces';



@Component({
  selector: 'app-extra-options',
  templateUrl: './extra-options.component.html',
  styleUrls: ['./extra-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraOptionsComponent implements OnInit {
 selectedOpt: ShippingMethod;
  @Input() set selectedOption(option: ShippingMethod) {
    
    this.selectedOpt = option;
  }
  @Input() shippingMethods: ShippingMethod[] = [];
  @Output() selectOption = new EventEmitter<ShippingMethod>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectOption(event: Event, method: ShippingMethod
  ) {
    event.preventDefault();
    this.selectOption.emit(method);
  }
}
