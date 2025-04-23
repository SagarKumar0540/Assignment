import { renderHook, act } from '@testing-library/react-native';
import useProductViewModel from '../productViewModel';
import { useAppDispatch, useAppSelector } from '../../../../state/hooks';
import { fetchProducts } from '../../state/thunks/productThunk';

jest.mock('../../../../state/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../state/thunks/productThunk', () => ({
  fetchProducts: jest.fn(),
}));

describe('useProductViewModelTest', () => {
  let mockDispatch;
  let mockSelector;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockSelector = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppSelector.mockImplementation((selector) => mockSelector(selector));
    fetchProducts.mockReturnValue({ unwrap: jest.fn() });
    jest.clearAllMocks();
  });

  it('returns initial product state correctly', () => {
    const mockState = {
      product: {
        cachedPages: { 0: [{ id: 1, name: 'Product 1' }], 10: [{ id: 2, name: 'Product 2' }] },
        loading: false,
        error: null,
        hasMore: true,
        skip: 10,
      },
    };
    mockSelector.mockReturnValue(mockState.product);

    const { result } = renderHook(() => useProductViewModel());

    expect(result.current.productState).toEqual({
      data: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }],
      loading: false,
      error: null,
      hasMore: true,
      skip: 10,
      cachedPages: mockState.product.cachedPages,
    });
    expect(useAppSelector).toHaveBeenCalled();
  });

  it('memoizes product state correctly', () => {
    const mockState = {
      product: {
        cachedPages: { 0: [{ id: 1, name: 'Product 1' }] },
        loading: false,
        error: null,
        hasMore: true,
        skip: 0,
      },
    };
    mockSelector.mockReturnValue(mockState.product);

    const { result, rerender } = renderHook(() => useProductViewModel());

    const firstState = result.current.productState;
    rerender();
    const secondState = result.current.productState;

    expect(firstState).toBe(secondState); 
    expect(firstState.data).toEqual([{ id: 1, name: 'Product 1' }]);
  });

  it('fetches products correctly', async () => {
    const mockUnwrap = jest.fn().mockResolvedValue(undefined);
    fetchProducts.mockReturnValue({ unwrap: mockUnwrap });

    const { result } = renderHook(() => useProductViewModel());

    await act(async () => {
      await result.current.fetchProducts(10);
    });

    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts(10));
    expect(fetchProducts).toHaveBeenCalledWith(10);
  });

  it('handles fetch error correctly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error(`Cannot read properties of undefined (reading 'unwrap')`);
    const mockUnwrap = jest.fn().mockRejectedValue(mockError);
    fetchProducts.mockReturnValue({ unwrap: mockUnwrap });

    const { result } = renderHook(() => useProductViewModel());

    await act(async () => {
      await result.current.fetchProducts(0);
    });

    expect(mockDispatch).toHaveBeenCalledWith(fetchProducts(0));
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch products:', mockError);
    consoleErrorSpy.mockRestore();
  });


});