import { ShopStateService } from './../services/shop-state.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmptyCartGuard implements CanActivate {

  constructor(
    private shopState: ShopStateService,
    private router: Router

  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.shopState.getAddedToCartProducts$()
      .pipe(
        map(products => products.length > 0 ? true : false),
        tap(isEmptyCart => !isEmptyCart ? this.router.navigate(['/shoping-page']) : '')
      );
  }

}
