import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../context/themeContext';
import { useAppDispatch } from '../../../state/hooks';
import { setIsUserLogin } from '../../../state/slices/authSlice';
import ThemeToggleBtn from '../../../common/components/themeToggleBtn';

const WelcomeScreen: React.FC = () => {
  const {colors,} = useTheme()
  const dispatch = useAppDispatch()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 40,
    },
    button: {
      backgroundColor: colors.secondary,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 25,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    toggleBtn:{
      position:'absolute',
      top:20,
      right:25
    }
  });

  const handleGetStarted = () => {
    dispatch(setIsUserLogin(true))
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ThemeToggleBtn containerStyle={styles.toggleBtn} />
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Discover something amazing with our app
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default WelcomeScreen;