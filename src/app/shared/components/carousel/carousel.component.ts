import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ImageForCarousel } from '../../interfaces';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CarouselComponent {
  private _slides: ImageForCarousel[];

  @Input() set slides(slides: ImageForCarousel[]) {
    this._slides = slides;
  }

  get slides() {
    return this._slides;
  }
}

