import { StoreSettings } from './../../shared/interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export class StyleConfig {
  header_NavBarBgColor?: string
  header_FontColor?: string
  header_cartBtnBgColor?: string
  footer_BgColor?: string
  footer_TextColor?: string
  cart_SubmitBtnBgColor?: string
  cart_SubmitBtnTextColor?: string
  productCard_BgColor?: string
  productCard_SubmitBtnBgColor?: string
  productCard_SubmitBtnTextColor?: string
  categoryList_hoverColor?: string
  orderPersonalInfo_HeaderTextColor?: string
  orderPersonalInfo_HeaderBgColor?: string
  orderPersonalInfo_BackBtnColor?: string
  orderPersonalInfo_SubmitBtnColor?: string
  constructor(args: StyleConfig = {
    header_NavBarBgColor: '',
    header_FontColor: '',
    header_cartBtnBgColor: '',
    footer_BgColor: '',
    footer_TextColor: '',
    cart_SubmitBtnBgColor: '',
    cart_SubmitBtnTextColor: '',
    productCard_BgColor: '',
    productCard_SubmitBtnBgColor: '',
    productCard_SubmitBtnTextColor: '',
    categoryList_hoverColor: '',
    orderPersonalInfo_HeaderTextColor: '',
    orderPersonalInfo_HeaderBgColor: '',
    orderPersonalInfo_BackBtnColor: '',
    orderPersonalInfo_SubmitBtnColor: '',
  }) {
    this.header_NavBarBgColor = args.header_NavBarBgColor
    this.header_FontColor = args.header_FontColor
    this.header_cartBtnBgColor = args.header_cartBtnBgColor
    this.footer_BgColor = args.footer_BgColor
    this.footer_TextColor = args.footer_TextColor
    this.cart_SubmitBtnBgColor = args.cart_SubmitBtnBgColor
    this.cart_SubmitBtnTextColor = args.cart_SubmitBtnTextColor
    this.productCard_BgColor = args.productCard_BgColor
    this.productCard_SubmitBtnBgColor = args.productCard_SubmitBtnBgColor
    this.productCard_SubmitBtnTextColor = args.productCard_SubmitBtnTextColor
    this.categoryList_hoverColor = args.categoryList_hoverColor
    this.orderPersonalInfo_HeaderTextColor = args.orderPersonalInfo_HeaderTextColor
    this.orderPersonalInfo_HeaderBgColor = args.orderPersonalInfo_HeaderBgColor
    this.orderPersonalInfo_BackBtnColor = args.orderPersonalInfo_BackBtnColor
    this.orderPersonalInfo_SubmitBtnColor = args.orderPersonalInfo_SubmitBtnColor


  }

}


@Injectable({ providedIn: 'root' })
export class StyleConfigService {
  private _customStyles$ = new BehaviorSubject<StyleConfig>(null)

  private readonly customStyles$: Observable<StyleConfig> = this._customStyles$.pipe(filter(styles => styles !== null))

  setStyles(styles: StyleConfig): void {
    const updatedStyles = { ... this._customStyles$.getValue(), ...styles }
    this._customStyles$.next(updatedStyles)
  }

  getStyles(): Readonly<Observable<StyleConfig>> {
    return this.customStyles$
  }

  private isStyleConfig(styleFor: keyof StyleConfig | undefined): styleFor is undefined {
    return styleFor === undefined
  }

  setStyleConfigFromSettings(settings: StoreSettings): void {

    const styleConfig = new StyleConfig()

    Object.keys(styleConfig).forEach(propery => {
      if (settings[propery]) {
        styleConfig[propery] = settings[propery]
      }
    })

    this.setStyles(styleConfig)

  }


}





