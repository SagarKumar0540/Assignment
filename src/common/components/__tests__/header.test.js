import React from 'react';
import { useTheme } from '../../../context/themeContext';
import { render } from '@testing-library/react-native';
import Header from '../header';

jest.mock("../../../context/themeContext", () => {
   return {useTheme: jest.fn()}
})


describe("HeaderTest", () => {
    const mockTitle = "Products"
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


    it("Header title render correctly",()=>{
        const {getByTestId}  = render(<Header title={mockTitle} />)
        const headerTitleTestInstance = getByTestId('header-title')

        expect(headerTitleTestInstance).toBeVisible()
        expect(headerTitleTestInstance).toHaveTextContent(mockTitle)
    })

})