import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MainBannerImage } from '../../services/main-page.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerListComponent {
  @Input() set banners(banners: MainBannerImage[]) {
    console.log('BANNERS', banners);
    this._banners = banners;
  }
  @Output() edit = new EventEmitter<MainBannerImage>();
  @Output() delete = new EventEmitter<number>();

  _banners: MainBannerImage[];
  constructor() { }


  onEdit(banner: MainBannerImage) {
    this.edit.emit(banner);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
