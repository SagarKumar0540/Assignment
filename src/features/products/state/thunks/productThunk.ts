import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductModel } from '../../models/productModel';
import { ProductService } from '../../services/postService';

export const fetchProducts = createAsyncThunk<{ data: ProductModel[]; hasMore: boolean }, number,{ rejectValue: string }
>(
  'product/fetchProducts',
  async (skip: number, thunkAPI) => {
    try {
      const response = await ProductService.fetchProducts(skip); 
      const { products, total, skip: responseSkip } = response;
      return {
        data: products,
        hasMore: responseSkip + products.length < total,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk<ProductModel, number>(
  'product/fetchProductById',
  async (productId, thunkAPI) => {
    try {
      const product = await ProductService.fetchProductsById(productId); 
      return product;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch product');
    }
  }
);
