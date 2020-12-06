import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductsOption } from 'src/app/shared/interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsListComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() productOptionsWithNestedItems: ProductsOption[];
  constructor() { }

  ngOnInit(): void {
    console.log('FORM ARRAY', this.form);
  }

}
