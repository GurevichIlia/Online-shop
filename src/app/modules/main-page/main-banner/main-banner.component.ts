import { Component, OnInit, Input } from '@angular/core';
import { MainBannerImage, MainBannerImages } from 'src/app/shared/services/main-page.service';
import { ProductsWebImageGallery, ImageForCarousel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  _mainBannerImages: ProductsWebImageGallery;
  @Input() imagesForCarousel: ImageForCarousel[];
  @Input() set mainBannerImages(mainBannerImages: ProductsWebImageGallery) {
    this._mainBannerImages = mainBannerImages;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
