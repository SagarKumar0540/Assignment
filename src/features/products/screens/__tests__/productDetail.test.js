import React, { memo } from "react"
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from "../../../../context/themeContext";
import { goBack } from "../../../../navigation/navigationService";
const ProductDetail = require('../ProductDetail');
import { render,fireEvent } from "@testing-library/react-native";

const ProductDetailScreen = (ProductDetail).default ;

jest.mock("../../../../context/themeContext", () => ({
    useTheme: jest.fn()
}))

jest.mock("../../../../navigation/navigationService",()=>({
  goBack:jest.fn()
}))


describe("ProductDetailScreenTest", () => {
    const mockProduct = {
        id: 1,
        title: 'Test Product',
        description: 'This is a detailed product description.',
        category: 'Electronics',
        price: 99.99,
        rating: 4.5,
        images: ['https://example.com/product.jpg'],
      };
    
      const mockRoute = {
        params: {
          product: mockProduct,
        },
      };
      
    

    beforeEach(() => {
        jest.clearAllMocks()

        useTheme.mockReturnValue({
            colors: {
                background: '#fff',
                text: '#000',
                secondary: '#666',
                primary: '#007AFF',
            },
            isDark: false,
        })

    })

    it("product detail screen UI render correctly",()=>{
        const {getByTestId} = render(<ProductDetailScreen  route={mockRoute} />)

        const productBackBtnTestInstance = getByTestId("back-btn")
        const productTitleTestInstance = getByTestId("product-title")
        const productCategoryTestInstance = getByTestId("product-category")
        const productRatingTestInstance = getByTestId("product-rating")
        const productPriceTestInstance = getByTestId("product-price")
        const productDescriptionTestInstance = getByTestId("product-description")


        expect(productBackBtnTestInstance).toBeVisible()

        expect(productTitleTestInstance).toBeVisible()
        expect(productTitleTestInstance).toHaveTextContent('Test Product')

        expect(productCategoryTestInstance).toBeVisible()
        expect(productCategoryTestInstance).toHaveTextContent('Electronics') 

        expect(productRatingTestInstance).toBeVisible()
        expect(productRatingTestInstance).toHaveTextContent('★ 4.5');
        
        expect(productPriceTestInstance).toBeVisible()
        expect(productPriceTestInstance).toHaveTextContent('$99.99');

        expect(productDescriptionTestInstance).toBeVisible()
        expect(productDescriptionTestInstance).toHaveTextContent(
          'This is a detailed product description.'
        );
  
    })

    it("goBack when back button pressed",()=>{
      const {getByTestId} = render(<ProductDetailScreen  route={mockRoute} />)

      const productBackBtnTestInstance = getByTestId("back-btn")
  
      fireEvent.press(productBackBtnTestInstance);
      expect(goBack).toHaveBeenCalled()
    })

})