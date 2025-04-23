import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts,fetchProductById } from '../thunks/productThunk';
import { ProductState } from '../../models/productState';


const initialState: ProductState = {
  data:[],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0,
  cachedPages:{}
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.cachedPages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { data, hasMore } = action.payload;
        const skip = action.meta.arg; 
        state.cachedPages[skip] = data; 
        state.skip = skip + data.length; 
        state.hasMore = hasMore;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});


export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;
