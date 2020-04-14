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
      MinPieces: number;
      // Comments: string;
      // Deleted: boolean;
      // ValidDate: string;
      // PartNumber: string;
      // Unitofmeasure: string;
      // PricePerUnitBeforeVat: number;
      // HideFromStock: boolean;
      ProductId: string;
      ProductsWebGroups_GroupId: string | string[];
      ProdName: string;
      ProdNameEng: string;
      Price: string;
      PartNumber: string;
      instituteId: string;
      addedToCart?: boolean;
      ShortDescription_500: string;
      LongDescription_4000: string;
      MainWebImageName: string;
      Isfeatured: string;
      IsNewItem: string;
      Pieces: string;
      files?: ProductsFile[];
      // image?: { url: string }; // FOR TESTING
}

export interface ProductsFile {
      Name: string;
      FullName: string;
      Size: number;
      CreationTime: string;
      LastAccessTime: string;
      LastWriteTime: string;
      IsFolder: boolean;
      FileSystemType: string;
}

export interface ProductInCart extends Product {
      quantity: number;
      totalPrice: number;
}

export interface BasicResponse<T> {
      Data: T;
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

export interface OrderInfo extends CustomerInfoBase, CustomerInfo {
      ShippingMethod: number;
      order: ProductInCart[];
}

export interface ParamsAfterPayment {
      terminalnumber: string;
      lowprofilecode: string;
      ResponeCode: string;
      Operation: string;
      ResponseCode: string;
      Status: string;
}

export interface GetProductsWebImageGallery {
      GetProductsWebImageGallery: ProductsWebImageGallery[];
}


export interface ProductsWebImageGallery {
      ImageId: number;
      ImageName1: string;
      SortOrder1: number;
      ImageLink1: string;
      SortOrder2: number;
      ImageName2: string;
      ImageLink2: string;
      SortOrder3: number;
      ImageName3: string;
      ImageLink3: string;
      SortOrder4: number;
      ImageName4: string;
      ImageLink4: string;
      SortOrder5: number;
      ImageName5: string;
      ImageLink5: string;
      SortOrder6: number;
      ImageName6: string;
      ImageLink6: string;
      SortOrder7: number;
      ImageName7: string;
      ImageLink7: string;
      SortOrder8: number;
      ImageName8: string;
      ImageLink8: string;
      SortOrder9: number;
      ImageName9: string;
      ImageLink9: string;
      SortOrder10: number;
      ImageName10: string;
      ImageLink10: string;
      OrgId: number;
      LogoFileName1: string;
      FooterImage1: string;
      FooterImage2: string;
      FooterImage3: string;
      FooterImage1Link: string;
      FooterImage2Link: string;
      FooterImage3Link: string;
      TopImage1: string;
      TopImage1Link: string;
      TopImage2: string;
      TopImage2Link: string;
      link: string;
}

export interface ImageForCarousel {
      [key: string]: string;
}


export interface ImageForFastShop {
      [key: string]: string;

}

export type ImageKey = 'ImageName' | 'FooterImage' | 'TopImage';

export interface ShippingMethod {
      Shippingid: number;
      ShippingMethood: string;
      ShippingMethoodEng: string;
      ShippingPrice: number;
      ShippingOrder: number;
      OrgId: number;

}
// const updateValue: <T extends keyof State, K extends State[T]> = (name: T, value: K): void => this.setState({ [name]: value });