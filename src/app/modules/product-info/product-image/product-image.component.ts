import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductImageComponent {
  @Input() image: { url: string };
  // @Input() index: number;

  // @Output() prevImage = new EventEmitter();
  // @Output() nextImage = new EventEmitter();
  constructor() { }

 

  // onPrevImage() {
  //   this.prevImage.emit();
  // }
  // onNextImages() {
  //   this.nextImage.emit();
  // }
}
