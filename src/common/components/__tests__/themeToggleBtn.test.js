import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThemeToggleBtn from '../ThemeToggleBtn';
import { useTheme } from '../../../context/themeContext';
import Icon from 'react-native-vector-icons/Ionicons';

jest.mock('../../../context/themeContext', () => ({
  useTheme: jest.fn(),
}));


describe('ThemeToggleBtn', () => {
  const mockToggleTheme = jest.fn();
  const defaultColors = { text: '#000000' };

  beforeEach(() => {
    useTheme.mockReturnValue({
      toggleTheme: mockToggleTheme,
      theme: 'light',
      colors: defaultColors,
    });
  });

  it('renders correctly with light theme', () => {
    const { getByTestId } = render(<ThemeToggleBtn />);
    const iconTestInstance = getByTestId('themeToggle-icon'); 
    expect(iconTestInstance.props.name).toBe('moon');
    expect(iconTestInstance.props.color).toBe(defaultColors.text);
  });

  it('renders correctly with dark theme', () => {
    useTheme.mockReturnValue({
      toggleTheme: mockToggleTheme,
      theme: 'dark',
      colors: defaultColors,
    })
    const { getByTestId } = render(<ThemeToggleBtn />);
    const iconTestInstance = getByTestId('themeToggle-icon'); 
    expect(iconTestInstance.props.name).toBe('sunny');
    expect(iconTestInstance.props.color).toBe(defaultColors.text);
  });

it("should toggle button exist",()=>{
    const { getByTestId } = render(<ThemeToggleBtn />);
    const iconTestInstance = getByTestId('themeToggle-btn'); 

    expect(iconTestInstance).toBeVisible()
})

});
