

import { Component, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],

})
export class CarouselComponent {
  @Input() slides
    = [
      { img: 'https://www.future-customer.com/wp-content/uploads/sites/4/iStock-863190232-900x600.jpg' },
      { img: 'http://www.pdldistributors.co.za/wp-content/uploads/How-To-Keep-The-Momentum-Going-After-The-Holiday-Season-Is-Over.png' },
      { img: 'https://nolga.ru/images/news/367-367-umnyy-shoping-za-granicey.jpg' },

    ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500
  };


  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {

    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
}

