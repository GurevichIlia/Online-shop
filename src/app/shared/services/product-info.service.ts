import { ShopStateService } from './shop-state.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  constructor(
    private apiService: ApiService,
    private shopState: ShopStateService
  ) { }

  onPreviousImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === 0 ? quantityPhotos : currentPhotoIndex - 1;


  }
  onNextImage(currentPhotoIndex: number, quantityPhotos: number) {
    return currentPhotoIndex === quantityPhotos ? 0 : currentPhotoIndex + 1;

  }

  getProductsFiles(productId: number) {
    return this.shopState.getShopSettings$()
      .pipe(
        switchMap(settings => {

          if (!settings) {
            return of([]);
          }

          return this.apiService.getProductsFiles(productId, settings.orgId)
            .pipe(
              map(res => res.Data.GetProductFileList),
            );
        })
      )

  }
}
