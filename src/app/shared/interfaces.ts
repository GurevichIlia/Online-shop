import { CustomerInfo } from './services/customer-info.service';

export interface ProductCategory {
      // ProdCatId: number;
      // CategoryName: string;
      // CategoryNameEng: string;
      // Deleted: boolean;

      GroupId: number;
      GroupName: string;
      GroupNameEng: string;
      GroupParenCategory: number;
      isHide: boolean;
      instituteId: number;
}

export interface Product {
      // ProductId: number;
      // ProdCatId: number;
      // ProdName: string;
      // ProdNameEng: string;
      // PiecesPerBox: number;
      // PiecesPerCase: number;
      // BoxPerCase: number;
      // Pieces: number;
      // Boxes: number;
      // Cases: number;
      // Price: number;
      // CurrencyId: string;
      // MinPieces: number;
      // Comments: string;
      // Deleted: boolean;
      // ValidDate: string;
      // PartNumber: string;
      // Unitofmeasure: string;
      // PricePerUnitBeforeVat: number;
      // HideFromStock: boolean;
      ProductId: string;
      ProductsWebGroups_GroupId: string;
      ProdName: string;
      ProdNameEng: string;
      Price: string;
      PartNumber: string;
      instituteId: string;
      addedToCart?: boolean;
      ShortDescription_500: string;
      LongDescription_4000: string;
      image?: { url: string }; // FOR TESTING
}

export interface ProductInCart extends Product {
      quantity: number;
      totalPrice: number;
}

export interface BasicResponse {
      Data: any;
      IsError: boolean;
      ErrMsg: string;
}

export interface CustomerInfoBase {
      tz?: number;
      kevaAmount: number;
      keva_ChargeDay?: number;
      email: string;
      firstName: string;
      lastName: string;
      city: string;
      cellphone: string;
      remark?: string;
      TotalMonthtoCharge?: number;
}

export interface CustomerOrderInfo extends CustomerInfoBase, CustomerInfo  {

} 

export interface ParamsAfterPayment {
      terminalnumber: string;
      lowprofilecode: string;
      ResponeCode: string;
      Operation: string;
      ResponseCode: string;
      Status: string;
    }
