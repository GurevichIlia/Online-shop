import { Component, OnInit, Input } from '@angular/core';
import {  TopImages } from 'src/app/shared/services/main-page.service';
import {  ImageForCarousel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  _mainBannerImages: TopImages;
  @Input() imagesForCarousel: ImageForCarousel[];
  @Input() set imagesForTop(mainBannerImages: TopImages) {
    this._mainBannerImages = mainBannerImages;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
