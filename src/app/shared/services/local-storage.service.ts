import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any) {
    const newValue: string = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
