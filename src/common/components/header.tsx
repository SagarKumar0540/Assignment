import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/themeContext';
import ThemeToggleBtn from './themeToggleBtn';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { colors, } = useTheme(); 
  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.background,
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      alignItems: 'center',
      flex: 1, 
    },
    title: {
      fontSize: 25,
      color: colors.text,
      letterSpacing: 0.5,
    },
    toggleButton: {
      padding: 10,
      borderRadius: 25,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <Text testID="header-title" style={styles.title}>
          {title}
        </Text>
      </View>
      <ThemeToggleBtn />
    </View>
  );
};

export default Header;
