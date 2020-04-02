import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { ProductCategory, Product, BasicResponse, CustomerOrderInfo, GetProductsWebImageGallery } from '../interfaces';
import { Observable, of } from 'rxjs';



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

  // getAllProductsAndCategoriesFromServer(): Observable<{ ProductCategories: ProductCategory[], Products: Product[] }> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       // 'Content-Type': 'application/json',
  //       Authorization: token
  //     })
  //   };
  //   // tslint:disable-next-line: max-line-length
  //   return this.http.get<BasicResponse>(`${this.baseUrl}Receipt/GetProductsData?urlAddr=jaffanet1`, httpOptions)
  //     .pipe(tap(data => console.log(data)), map(response => response.Data)
  //     );
  // }

  getProductsWebGroup(): Observable<{ ProductsWebGroups: ProductCategory[] }> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ ProductsWebGroups: ProductCategory[] }>>(`${this.baseUrl}ShoppingSite/GetProductsWebGroups?urlAddr=jaffanet1`, httpOptions)
      .pipe(tap(data => console.log(data)), map(response => response.Data)
      );
  }

  getWebGroupsProducts(groupId = 3): Observable<{ WebGroupsProduct: Product[] }> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<BasicResponse<{ WebGroupsProduct: Product[] }>>(`${this.baseUrl}ShoppingSite/GetsWebGroupsProduct?urlAddr=jaffanet1&groupid=${groupId}`,
      httpOptions)
      .pipe(tap(data => console.log(data)), map(response => response.Data)
      );
  }


  saveCustomerInfo(orderInfo: CustomerOrderInfo, pageGuid = 'F56154EEDB0F4CE0BF5E206F05E2A6D5') {
    return this.http.post(`https://jaffawebapi.amax.co.il/Api/LandingPage/SaveKevaInfo?urlAddr=${pageGuid}`, orderInfo);
  }
  // getAllProductsAndCategoriesFromServer(): Observable<{ ProductCategories: ProductCategory[], Products: Product[] }> {
  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({
  //   //     // 'Content-Type': 'application/json',
  //   //     Authorization: token
  //   //   })
  //   // };
  //   // tslint:disable-next-line: max-line-length
  //   return this.http.get<BasicResponse>(`${this.baseUrl}Receipt/GetProductsData?urlAddr=jaffanet1`, httpOptions)
  //     .pipe(tap(data => console.log(data)), map(response => response.Data)
  //     );
  // }

  uploadGalleryLogo(logo: File) {
    debugger
    const newFile = logo;
    const formData = new FormData();

    formData.append('upload', newFile, newFile.name);
    const test = formData
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

    // {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: token,
    //     enctype: 'multipart/form-data',
    //     Accept: 'application/json'
    //   }),
    //     params: new HttpParams()
    // };
    // const params = new HttpParams();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append('enctype', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // const options = {
    //   header: headers,
    //   params,
    //   reportProgress: true
    // };

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
        shareReplay(3));
  }
}
