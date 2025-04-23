import { ProductModel } from "./productModel";

export interface ProductListResponse {
    products: ProductModel[];
    total: number;
    skip: number;
    limit: number;
  }