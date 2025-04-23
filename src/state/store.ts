import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../features/products/state/slices/productSlice'
import AuthReducer from '../state/slices/authSlice'

export const store = configureStore({
  reducer: {
    auth:AuthReducer,
    product:ProductReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
