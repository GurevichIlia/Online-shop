import { StoreSettings } from './../../shared/interfaces';
import { HomeService } from './../../shared/services/home.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppSettingsResolver implements Resolve<StoreSettings> {
  constructor(private homeService: HomeService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<StoreSettings> {
    return this.homeService.getStoreSetting();
  }
}
