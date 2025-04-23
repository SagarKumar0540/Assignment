import React from "react";
import { render, fireEvent } from '@testing-library/react-native'
import ProductCard from "../productCard";
import { navigate } from '../../../../navigation/navigationService';
import { useTheme } from '../../../../context/themeContext';

jest.mock("../../../../navigation/navigationService", () => ({
    navigate: jest.fn()
}))

jest.mock("../../../../context/themeContext", () => ({
    useTheme: jest.fn()
}))


describe("ProductCardTest", () => {
    const mockProduct = {
        id: 1,
        title: 'Sample Product',
        description:
          'This is a long product description that should be truncated because it exceeds 100 characters in length for testing purposes.',
        category: 'electronics',
        price: 99.99,
        rating: 4.5,
        images: ['https://example.com/product.jpg'],
      }
    
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
        });
    })


    it("render product card details correct",()=>{
        const {getByTestId} = render(<ProductCard product={mockProduct} />)
        const productCardTestInstance = getByTestId('productCard-btn')
        const productCardImageTestInstance = getByTestId('productCard-image')
        const productCardTitleTestInstance = getByTestId('productCard-title')
        const productCardCategoryTestInstance = getByTestId('produtCard-category')
        const productCardPriceTestInstance = getByTestId('productCard-price')
        const productCardRatingTestInstance = getByTestId('productCard-rating')
        const productCardDescriptionTestInstance = getByTestId('productCard-description')

        expect(productCardTestInstance).toBeVisible()
        expect(productCardImageTestInstance).toBeVisible()

        expect(productCardTitleTestInstance).toHaveTextContent("Sample Product")
        expect(productCardTitleTestInstance).toBeVisible()

        expect(productCardCategoryTestInstance).toHaveTextContent("electronics")
        expect(productCardCategoryTestInstance).toBeVisible()

        expect(productCardPriceTestInstance).toHaveTextContent("$99.99")
        expect(productCardPriceTestInstance).toBeVisible()

        expect(productCardRatingTestInstance).toHaveTextContent("★ 4.5")
        expect(productCardRatingTestInstance).toBeVisible()

        expect(productCardDescriptionTestInstance).toHaveTextContent("This is a long product description that should be truncated because it exceeds 100 characters in len...")
        expect(productCardDescriptionTestInstance).toBeVisible()
    })

    it("does not truncate short description",()=>{
        const mockProduct = {
            id: 1,
            title: 'Sample Product',
            description:
              'This is a short product description',
            category: 'electronics',
            price: 99.99,
            rating: 4.5,
            images: ['https://example.com/product.jpg'],
          }

          const {getByTestId} = render(<ProductCard product={mockProduct} />)
          const productCardDescriptionTestInstance = getByTestId('productCard-description')

          expect(productCardDescriptionTestInstance).toBeVisible()
          expect(productCardDescriptionTestInstance).toHaveTextContent('This is a short product description')

    })


    it("navigate to product detail screen on click on any card",()=>{
        const {getByTestId} = render(<ProductCard product={mockProduct} />)
        const productCardTestInstance = getByTestId('productCard-btn')

        expect(productCardTestInstance).toBeVisible()
        fireEvent.press(productCardTestInstance)

        expect(navigate("product_detail",{product:mockProduct}))

    })

})