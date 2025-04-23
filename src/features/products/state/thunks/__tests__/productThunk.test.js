import { fetchProducts, fetchProductById } from '../productThunk';
import { ProductService } from '../../../services/postService'

jest.mock('../../../services/postService');

describe('ProductThunksTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAllProducts', () => {
    it('sucessfully fetch  products', async () => {
      const mockProducts = [
        { id: 1, title: 'Product 1', description: 'Desc 1', price: 100 },
        { id: 2, title: 'Product 2', description: 'Desc 2', price: 200 },
      ];

      ProductService.fetchProducts.mockResolvedValue({
        products: mockProducts,
        total: 10,
        skip: 0,
      });

      const thunk = fetchProducts(0);
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('product/fetchProducts/fulfilled');
      expect(result.payload).toEqual({
        data: mockProducts,
        hasMore: true,
      });
    });

    it('error in fetching products', async () => {
      ProductService.fetchProducts.mockRejectedValue(new Error('API Error'));

      const thunk = fetchProducts(0);
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('product/fetchProducts/rejected');
      expect(result.payload).toBe('Failed to fetch products');
    });
  });

  describe('fetchProductById', () => {
    it('successfully fetched product detail by product id', async () => {
      const product = {
        id: 1,
        title: 'Single Product',
        description: 'This is a product',
        price: 99,
      };

      ProductService.fetchProductsById.mockResolvedValue(product);

      const thunk = fetchProductById(1);
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('product/fetchProductById/fulfilled');
      expect(result.payload).toEqual(product);
    });

    it('error in fetching single product detail by product id', async () => {
      ProductService.fetchProductsById.mockRejectedValue(new Error('API Error'));

      const thunk = fetchProductById(1);
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const result = await thunk(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe('product/fetchProductById/rejected');
      expect(result.payload).toBe('Failed to fetch product');
    });
  });
});
