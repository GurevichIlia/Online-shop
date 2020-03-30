import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() continuePayment = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  
  onContinuePayment() {
    this.continuePayment.emit();
  }
}
