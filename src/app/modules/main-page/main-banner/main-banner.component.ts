import { Component, OnInit, Input } from '@angular/core';
import { TopImages } from 'src/app/shared/services/main-page.service';
import { ImageForCarousel } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  _mainBannerImages: TopImages;
  image1 = '';
  image2 = '';
  @Input() imagesForCarousel: ImageForCarousel[];
  @Input() set imagesForTop(mainBannerImages: TopImages) {

    if (mainBannerImages) {
      this._mainBannerImages = mainBannerImages;
      this.image1 = `url(${mainBannerImages.link1})`;
      this.image2 = `url(${mainBannerImages.link2})`;
    }


  }
  constructor() { }

  ngOnInit(): void {
  }

}
