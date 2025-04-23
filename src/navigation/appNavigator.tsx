import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import MainNavigator from './mainNavigator'; 
import { navigationRef } from './navigationService';
import { useAppSelector } from '../state/hooks';

 

const AppNavigator = () => {
  const {isUserLoggedIn=false} = useAppSelector(state => state.auth)
  return (
    <NavigationContainer ref={navigationRef}>
      {isUserLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
