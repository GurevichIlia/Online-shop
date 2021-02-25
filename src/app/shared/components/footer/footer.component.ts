import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StyleConfig, StyleConfigService } from './../../../core/style-config/style-config';
import { StoreSettings } from './../../interfaces';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() storeSettings: StoreSettings;
  styles$: Observable<StyleConfig> = this.styleService.getStyles()

  constructor(
    private styleService: StyleConfigService
  ) { }

  ngOnInit(): void {
  }

}
