import { ProductService } from '../postService';
import apiClient from '../../../../core/apiClient';
import { endPoints } from '../../../../config';

// Mock the apiClient module
jest.mock('../../../../core/apiClient');

describe('ProductServiceTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchProductsAPICallTest', () => {
    it('successfully calls API with correct URL and returns data', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'Test Product' }],
        total: 1,
        skip: 0,
        limit: 20,
      };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await ProductService.fetchProducts(0, 20);

      expect(apiClient.get).toHaveBeenCalledWith(`${endPoints.products}?skip=0&limit=20`);
      expect(result).toEqual(mockResponse);
    });

    it('API failure and throws error', async () => {
      const mockError = new Error('Network Error');
      apiClient.get.mockRejectedValue(mockError);

      await expect(ProductService.fetchProducts(0, 20)).rejects.toThrow('Network Error');
      expect(apiClient.get).toHaveBeenCalledWith(`${endPoints.products}?skip=0&limit=20`);
    });
  });

  describe('fetchProductsByIdAPICallTest', () => {
    it('successfully calls API with correct URL and returns product', async () => {
      const mockProduct = { id: 42, title: 'Product 42' };
      apiClient.get.mockResolvedValue(mockProduct);

      const result = await ProductService.fetchProductsById(42);

      expect(apiClient.get).toHaveBeenCalledWith(`${endPoints.products}/42`);
      expect(result).toEqual(mockProduct);
    });

    it('API failure and throws error for wrong product by ID', async () => {
      const mockError = new Error('Product not found');
      apiClient.get.mockRejectedValue(mockError);

      await expect(ProductService.fetchProductsById(-1)).rejects.toThrow('Product not found');
      expect(apiClient.get).toHaveBeenCalledWith(`${endPoints.products}/-1`);
    });
  });
});
