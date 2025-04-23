import { endPoints } from '../../../config';
import apiClient from '../../../core/apiClient';
import { ProductListResponse } from '../models/productListResModel';
import { ProductModel } from '../models/productModel';

export const ProductService = {
  async fetchProducts(skip:number=0,limit:number = 20): Promise<ProductListResponse> {
    return apiClient.get<ProductListResponse>(`${endPoints.products}?skip=${skip}&limit=${limit}`);
  },

  async fetchProductsById(id: number): Promise<ProductModel> {
    return apiClient.get<ProductModel>(`${endPoints.products}/${id}`);
  },


};
