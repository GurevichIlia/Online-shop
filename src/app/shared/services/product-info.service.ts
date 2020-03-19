import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  constructor() { }

  onPreviousImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === 0 ? quantityPhotos : currentPhotoIndex - 1;


  }
  onNextImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === quantityPhotos ? 0 : currentPhotoIndex + 1;


  }
}
