import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  constructor(private apiService: ApiService) { }

  onPreviousImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === 0 ? quantityPhotos : currentPhotoIndex - 1;


  }
  onNextImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === quantityPhotos ? 0 : currentPhotoIndex + 1;

  }

   getProductsFiles(productId: number) {
    return this.apiService.getProductsFiles(productId)
      .pipe(
        map(res => res.Data.GetProductFileList)
      );
  }
}
