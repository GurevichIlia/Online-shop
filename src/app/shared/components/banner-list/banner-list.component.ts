import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ProductsFile } from './../../interfaces';


export interface Config {
  [key: string]: string;
}


@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerListComponent {
  @Input() set banners(banners: ProductsFile[] | { url: string }[]) {

    console.log('PRODUCT IMAGES', banners);
    this._banners = banners ? banners : null;
  }


  @Output() delete = new EventEmitter<{ image: ProductsFile, index: number }>();
  @Output() select = new EventEmitter<number>();


  _banners: ProductsFile[] | { url: string }[] = [];
  constructor() { }

  onSelect(index: number) {
    this.select.emit(index);
  }

  onDelete(image: ProductsFile, index: number) {
    this.delete.emit({ image, index });
  }
}
