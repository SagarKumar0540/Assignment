import { useCallback, useMemo } from 'react';
import { fetchProducts } from '../state/thunks/productThunk';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';

const useProductViewModel = () => {
  const dispatch = useAppDispatch();
  const rawProductState = useAppSelector(state => state.product) 

  const productState = useMemo(
    () => {
      const _data = Object.keys(rawProductState?.cachedPages || {})
        .map(Number)
        .sort((a, b) => a - b)
        .flatMap((page) => rawProductState?.cachedPages[page] || []);
  
      return {
        data: _data,
        loading: rawProductState?.loading,
        error: rawProductState?.error,
        hasMore: rawProductState?.hasMore,
        skip: rawProductState?.skip,
        cachedPages: rawProductState?.cachedPages,
      };
    },
    [rawProductState]
  );

  
  const fetchProductsData = useCallback(
    async (skip: number = 0) => {
      try {
        await dispatch(fetchProducts(skip)).unwrap(); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },
    [dispatch]
  );

  return {
    fetchProducts: fetchProductsData,
    productState,
  };
};


export default useProductViewModel;