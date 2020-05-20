import { Component, OnInit, Input } from '@angular/core';
import { ImageForFastShop } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-fast-shop',
  templateUrl: './fast-shop.component.html',
  styleUrls: ['./fast-shop.component.scss']
})
export class FastShopComponent implements OnInit {
  @Input() set imagesForFastShop(imagesForFastShop: ImageForFastShop[]) {
    if (imagesForFastShop && imagesForFastShop.length !== 0 ) {
      this.image1 = { ...imagesForFastShop[0], link: `url(${imagesForFastShop[0].link})` };
      this.image2 = { ...imagesForFastShop[1], link: `url(${imagesForFastShop[1].link})` };
      this.image3 = { ...imagesForFastShop[2], link: `url(${imagesForFastShop[2].link})` };
    }

  }
  image1: ImageForFastShop;
  image2: ImageForFastShop;
  image3: ImageForFastShop;
  constructor() { }

  ngOnInit(): void {
  }

}
