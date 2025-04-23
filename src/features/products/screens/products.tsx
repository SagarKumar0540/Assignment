import React, { useCallback, useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ProductCard from '../components/productCard';
import PaginatedFlatList from '../../../common/components/paginatedFlatlist';
import Header from '../../../common/components/header';
import { useTheme } from '../../../context/themeContext';
import { ProductModel } from '../models/productModel';
import useProductViewModel from '../viewModels/productViewModel';


const ProductScreen: React.FC = () => {
  const {colors} = useTheme()
  const {fetchProducts,productState} = useProductViewModel()
  
  const renderItem = useCallback(
    ({ item,index }: { item: ProductModel,index:number }) => {
      return <ProductCard product={item} />;
    },
    []
  );

  const keyExtractor = useCallback((item: ProductModel, index: number) => `${item.id}`, []);

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.empty}>
        <Text>No items found</Text>
      </View>
    ),
    []
  );
  

  return (
    <SafeAreaView style={{ flex: 1.0,backgroundColor:colors.background }} >
      <Header title='Products' />
      <PaginatedFlatList
        fetchData={fetchProducts}
        state={productState}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});


export default ProductScreen;