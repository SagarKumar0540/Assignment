import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../theme/themes';
import { ThemeContextType } from '../common/models/themeContextModel';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemTheme || 'light');

  useEffect(() => {
    // Load saved theme from storage
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('appTheme');
        if (savedTheme) {
          setTheme(savedTheme as 'light' | 'dark');
        }else {
          setTheme("light")
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('appTheme', theme);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    };
    saveTheme();
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue: ThemeContextType = {
    theme,
    colors: theme === 'light' ? lightTheme : darkTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext<ThemeContextType | undefined >(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};