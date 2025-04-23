import reducer, {
    clearProducts,
  } from '../productSlice';
  import { fetchProducts } from '../../thunks/productThunk';
  
  describe('productSlice (React Native compatible)', () => {
    const initialState = {
      cachedPages: {},
      loading: false,
      error: null,
      hasMore: true,
      skip: 0,
    };
  

  
    it('handles clearProducts', () => {
      const stateWithData = {
        ...initialState,
        cachedPages: {
          0: [{ id: 1, title: 'Product A' }],
          10: [{ id: 2, title: 'Product B' }],
        },
      };
  
      const nextState = reducer(stateWithData, clearProducts());
      expect(nextState.cachedPages).toEqual([]);
    });
  
    it('handles fetchProducts.pending', () => {
      const action = { type: fetchProducts.pending.type };
      const nextState = reducer(initialState, action);
      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
    });
  
    it('handles fetchProducts.fulfilled', () => {
      const mockData = [
        { id: 1, title: 'Product A' },
        { id: 2, title: 'Product B' },
      ];
  
      const action = {
        type: fetchProducts.fulfilled.type,
        payload: {
          data: mockData,
          hasMore: true,
        },
        meta: {
          arg: 0, // skip value used in the thunk
        },
      };
  
      const nextState = reducer(initialState, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.cachedPages[0]).toEqual(mockData);
      expect(nextState.skip).toBe(2);
      expect(nextState.hasMore).toBe(true);
    });
  
    it('handles fetchProducts.rejected', () => {
      const action = {
        type: fetchProducts.rejected.type,
        payload: 'Network error',
      };
  
      const nextState = reducer(initialState, action);
      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe('Network error');
    });
  
   
  });
  