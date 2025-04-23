import React from "react";
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useTheme } from "../../context/themeContext";

const ThemeToggleBtn = ({containerStyle={}})=>{
    const {toggleTheme,theme,colors} = useTheme()

    return(
        <TouchableOpacity
        testID="themeToggle-btn"
        style={[
            styles.toggleButton,
            containerStyle
        ]}
        onPress={toggleTheme} 
      >
        <Icon
        testID="themeToggle-icon"
          name={ theme === 'light' ? 'moon' : 'sunny'} 
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    toggleButton: {
      padding: 10,
      borderRadius: 25,
    },
  });

export default ThemeToggleBtn