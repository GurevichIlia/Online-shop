import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ProductCategory } from '../interfaces';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopingPageService {
  selectedCategory = new BehaviorSubject<number>(0);
  selectedCategory$ = this.selectedCategory.asObservable();
  constructor() { }

  setCategory(categoryId: number) {
    this.selectedCategory.next(categoryId);
  }

  getSelectedCategory$() {
    return this.selectedCategory$.pipe(filter(categories => categories !== null))
  }

  getNestedChildren(arr, parent) {
    const children = [];
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].GroupParenCategory == parent) {
        let groupId;
        if (arr[i].GroupId !== 0) {
          groupId = arr[i].GroupId;
        } else {

        }
        const grandChildren = this.getNestedChildren(arr, groupId);
        if (grandChildren.length) {
          arr[i].children = grandChildren;
        }
        children.push(arr[i]);
      }
    }
    // const data = this.buildFileTree(children, 0);
    // this.dataChange.next(children);
    return children;
  }
}
