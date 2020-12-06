import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BasicResponse, GetProductsWebImageGallery, OrderInfo,
  Product, ProductCategory, ShippingMethod, StoreSettings, ProductsOption
} from '../interfaces';
import { shareReplay } from 'rxjs/operators';



// const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNzIXdkc2ZmIWV3ZmRnZmtqZGZkc0AiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiNjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2lzcGVyc2lzdGVudCI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNTMiLCJuYmYiOjE1ODU3MzEwMzUsImV4cCI6MTU4NTgxNzQzNSwiaWF0IjoxNTg1NzMxMDM1fQ.lKoz0iy5guQVZ1W200oYOQ-dnc-utGYTRqoq-4j49qw';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    // Authorization: token
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://jaffawebapisandbox.amax.co.il/API/';

  constructor(private http: HttpClient) { }

  getProductsWebGroup(orgName: string): Observable<BasicResponse<{ ProductsWebGroups: ProductCategory[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ ProductsWebGroups: ProductCategory[] }>>(`${this.baseUrl}ShoppingSite/GetProductsWebGroups?shopname=${orgName}`, httpOptions);
  }

  getWebGroupsProducts(groupId: number, orgName: string): Observable<BasicResponse<{ WebGroupsProduct: Product[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ WebGroupsProduct: Product[] }>>(`${this.baseUrl}ShoppingSite/GetsWebGroupsProduct?shopname=${orgName}&groupid=${groupId}`,
      httpOptions)
  }

  getAllProducts(groupId: number, orgName: string): Observable<BasicResponse<{ WebGroupsProduct: Product[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ WebGroupsProduct: Product[] }>>(`${this.baseUrl}ShoppingSite/GetsWebGroupsProduct?shopname=${orgName}&groupid=${groupId}`,
      httpOptions);
  }

  saveCustomerInfo(orderInfo: OrderInfo, pageGuid: string) {
    return this.http.post(`${this.baseUrl}LandingPage/SaveorderInfo?urlAddr=${pageGuid}`, orderInfo);
  }



  // UPLOAD IMAGES, NOT NEED NOW HERE, BECAUSE UPLOADING FROM CRM

  // uploadGalleryLogo(logo: File) {
  //   const newFile = logo;
  //   const formData = new FormData();

  //   formData.append('upload', newFile, newFile.name);
  //   const test = formData;
  //   const fileHttpOptions = {
  //     ...httpOptions,
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       enctype: 'multipart/form-data',
  //       Accept: 'application/json',
  //       Authorization: token

  //     }),
  //     params: new HttpParams()
  //   };


  //   return this.http
  //     .post(`${this.baseUrl}SystemTables/UploadGalleryLogoFile?id=1`, formData, fileHttpOptions)
  //     .pipe(
  //       map((res) => res),
  //       catchError(err => {
  //         console.log('ERROR', err);
  //         return of({});
  //       })
  //     );
  // }

  getGalleryImages(orgName: string) {
    return this.http.get<BasicResponse<GetProductsWebImageGallery>>
      (`${this.baseUrl}ShoppingSite/GetProductsWebImageGallery?shopname=${orgName}`);
  }

  public getProductsFiles(productId: number, orgId: string): Observable<BasicResponse<{ GetProductFileList: [] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ GetProductFileList: [] }>>(`${this.baseUrl}ShoppingSite/GetProductFileList?orgid=${orgId}&ProductId=${productId}`)
      .pipe(shareReplay())
      ;
  }

  getShippingMethods(org: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ StoreShipping: ShippingMethod[] }>>(`${this.baseUrl}ShoppingSite/GetStoreShipping?shopname=${org}`);
  }

  public getStoreSettings(orgName: string): Observable<BasicResponse<{ GetStoreSetting: StoreSettings[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ GetStoreSetting: StoreSettings[] }>>(`${this.baseUrl}ShoppingSite/GetStoreSetting?shopname=${orgName}`);
  }

  getProductsOptions(orgName: string, productId: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ ProductsStoreOptions: ProductsOption[] }>>(`${this.baseUrl}ShoppingSite/GetProductsStoreOptions?shopname=${orgName}&ProductId=${productId}`)
      .pipe(shareReplay());
  }

  getProductsOptionItems(orgName: string, optionId: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ ProductsStoreOptionItems: [] }>>(`${this.baseUrl}ShoppingSite/GetProductsStoreOptionItems?shopname=${orgName}&ProductStoreOptionId=${optionId}`)
      .pipe(shareReplay());

  }

}
