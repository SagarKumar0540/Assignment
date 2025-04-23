import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from '../features/products/screens/products';
import ProductDetail from '../features/products/screens/productDetail';

export type MainStackParamList = {
  product: undefined;
  product_detail:undefined
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="product"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="product" component={ProductScreen} />
      <Stack.Screen name="product_detail" component={ProductDetail}  />
    </Stack.Navigator>
  );
};

export default MainNavigator;