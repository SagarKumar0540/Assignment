import { ProductModel } from "./productModel";

export interface ProductState {
    data:ProductModel[],
    cachedPages: { [key: number]: ProductModel[] };
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    skip: number;
  }