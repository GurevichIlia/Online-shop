import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { ProductCategory, Product, BasicResponse } from '../interfaces';
import { Observable } from 'rxjs';



const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNzIXdkc2ZmIWV3ZmRnZmtqZGZkc0AiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiNjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2lzcGVyc2lzdGVudCI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNTMiLCJuYmYiOjE1ODQ1NDY0OTEsImV4cCI6MTU4NDYzMjg5MSwiaWF0IjoxNTg0NTQ2NDkxfQ.B6V6lwMxkEKgVfpdcQxlS4Ws8AuA1pgRhk_e8NEOIk8'

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
    return this.http.get<BasicResponse>(`${this.baseUrl}ShoppingSite/GetProductsWebGroups?urlAddr=jaffanet1`, httpOptions)
      .pipe(tap(data => console.log(data)), map(response => response.Data)
      );
  }

  getWebGroupsProducts(groupId = 3): Observable<{ WebGroupsProduct: Product[] }> {
    return this.http.get<BasicResponse>(`${this.baseUrl}ShoppingSite/GetsWebGroupsProduct?urlAddr=jaffanet1&groupid=${groupId}`,
      httpOptions)
      .pipe(tap(data => console.log(data)), map(response => response.Data)
      );
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

}
