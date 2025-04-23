import React from 'react';
import { View } from 'react-native';

const SafeAreaView = (props) => <View testID="mocked-safe-area" {...props} />;
const SafeAreaProvider = ({ children }) => children;

export const useSafeAreaInsets = () => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

export { SafeAreaView, SafeAreaProvider };