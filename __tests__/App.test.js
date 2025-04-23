// __tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the AppNavigator component to avoid rendering actual navigation components
jest.mock('../src/navigation/appNavigator', () => () => (
  <></>
));

// Mock the Redux store provider to avoid test issues with actual store
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  Provider: ({ children }) => <>{children}</>,
}));

// Mock the ThemeProvider to provide basic context
jest.mock('../src/context/themeContext', () => ({
  ThemeProvider: ({ children }) => <>{children}</>,
}));

describe('App', () => {
  it('renders without crashing and matches snapshot', () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});