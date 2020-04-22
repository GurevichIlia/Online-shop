import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { ProductCategory, Product, BasicResponse, GetProductsWebImageGallery, OrderInfo, ShippingMethod, StoreSettings } from '../interfaces';
import { Observable, of } from 'rxjs';
import { Params } from '@angular/router';



const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNzIXdkc2ZmIWV3ZmRnZmtqZGZkc0AiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiNjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2lzcGVyc2lzdGVudCI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNTMiLCJuYmYiOjE1ODU3MzEwMzUsImV4cCI6MTU4NTgxNzQzNSwiaWF0IjoxNTg1NzMxMDM1fQ.lKoz0iy5guQVZ1W200oYOQ-dnc-utGYTRqoq-4j49qw';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    Authorization: token
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://jaffawebapisandbox.amax.co.il/API/';

  constructor(private http: HttpClient) { }

  getProductsWebGroup(): Observable<BasicResponse<{ ProductsWebGroups: ProductCategory[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ ProductsWebGroups: ProductCategory[] }>>(`${this.baseUrl}ShoppingSite/GetProductsWebGroups?urlAddr=jaffanet1`, httpOptions);
  }

  getWebGroupsProducts(groupId: number): Observable<BasicResponse<{ WebGroupsProduct: Product[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ WebGroupsProduct: Product[] }>>(`${this.baseUrl}ShoppingSite/GetsWebGroupsProduct?urlAddr=jaffanet1&groupid=${groupId}`,
      httpOptions)
  }

  getAllProducts(groupId: number): Observable<BasicResponse<{ WebGroupsProduct: Product[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ WebGroupsProduct: Product[] }>>(`${this.baseUrl}ShoppingSite/GetsWebGroupsProduct?urlAddr=jaffanet1&groupid=${groupId}`,
      httpOptions);
  }

  saveCustomerInfo(orderInfo: OrderInfo, pageGuid = 'F56154EEDB0F4CE0BF5E206F05E2A6D5') {
    return this.http.post(`https://jaffawebapi.amax.co.il/Api/LandingPage/SaveKevaInfo?urlAddr=${pageGuid}`, orderInfo);
  }

  uploadGalleryLogo(logo: File) {
    const newFile = logo;
    const formData = new FormData();

    formData.append('upload', newFile, newFile.name);
    const test = formData;
    const fileHttpOptions = {
      ...httpOptions,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        enctype: 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token

      }),
      params: new HttpParams()
    };


    return this.http
      .post(`${this.baseUrl}SystemTables/UploadGalleryLogoFile?id=1`, formData, fileHttpOptions)
      .pipe(
        map((res) => res),
        catchError(err => {
          console.log('ERROR', err);
          return of({});
        })
      );
  }

  getGalleryImages() {
    return this.http.get<BasicResponse<GetProductsWebImageGallery>>
      (`${this.baseUrl}ShoppingSite/GetProductsWebImageGallery?urlAddr=jaffanet1`)
      .pipe(
        map((res) => res.Data.GetProductsWebImageGallery),
        shareReplay());
  }

  public getProductsFiles(productId: number): Observable<BasicResponse<{ GetProductFileList: [] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ GetProductFileList: [] }>>(`${this.baseUrl}ShoppingSite/GetProductFileList?orgid=153&ProductId=${productId}`);
  }

  getShippingMethods(org = 'jaffanet1') {
    return this.http.get<BasicResponse<{ StoreShipping: ShippingMethod[] }>>(`${this.baseUrl}ShoppingSite/GetStoreShipping?urlAddr=${org}`)
      .pipe(
        shareReplay())
      ;

  }

  public getStoreSettings(orgName = 'jaffanet1', orgId: number = 153): Observable<BasicResponse<{ GetStoreSetting: StoreSettings[] }>> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ GetStoreSetting: StoreSettings[] }>>(`${this.baseUrl}ShoppingSite/GetStoresetting?urlAddr=${orgName}&OrgId=${orgId}`);
  }

}
