import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Option } from './../../../shared/services/shoping-cart.service';



@Component({
  selector: 'app-extra-options',
  templateUrl: './extra-options.component.html',
  styleUrls: ['./extra-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraOptionsComponent implements OnInit {
 selectedOpt: Option;
  @Input() set selectedOption(option: Option) {
    
    this.selectedOpt = option;
  }
  @Input() extraOptions: Option[] = [];
  @Output() selectOption = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectOption(event: Event, optionId: number
  ) {
    event.preventDefault();
    this.selectOption.emit(optionId);
  }
}
