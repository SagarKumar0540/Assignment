import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../features/auth/screens/welcome';

export type AuthStackParamList = {
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;