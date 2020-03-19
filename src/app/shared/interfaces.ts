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
      images?: { url: string }[]; // FOR TESTING
}

export interface BasicResponse {
      Data: any;
      IsError: boolean;
      ErrMsg: string;
}