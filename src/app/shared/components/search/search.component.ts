import { FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

import { Product } from './../../interfaces';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { SearchService } from './../../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @ViewChild('Search') search: ElementRef<any>;
  products$: Observable<Product[]>;

  searchControl = new FormControl('');
  isFocused = false;
  isMobileView$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(

      map(result => {
        return result.matches;
      }),
    );
  constructor(
    private searchService: SearchService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,

  ) { }

  trackByFn(index, item) {
    return index; // or item.id
  }


  ngOnInit() {

    this.products$ = this.searchService.searchProducts(this.searchControl.valueChanges)


  }

  openProductInfo(productId: number) {
    this.router.navigate([`product-info/${productId}`]);

    this.searchControl.patchValue('');
    this.search.nativeElement.blur();
  }

  onBlur() {
    if (!this.searchControl.value) {
      setTimeout(() => {
        this.isFocused = false;
        this.changeDetectorRef.markForCheck();
      }, 1000);

    }



  }

  onFocus() {

    this.isFocused = true;

  }


  clearInput() {
    this.searchControl.patchValue('');
    this.onBlur();

  }
}
