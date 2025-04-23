import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { navigate } from '../../../navigation/navigationService';
import { useTheme } from '../../../context/themeContext';
import { ProductCardProps } from '../models/productCardModel';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { colors, isDark } = useTheme()
  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    productImage: {
      width: 100,
      height: 100,
      marginRight: 12,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    category: {
      fontSize: 12,
      color: colors.secondary,
      fontWeight: '600',
      marginBottom: 4,
      textTransform: 'capitalize'
    },
    priceRatingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    rating: {
      fontSize: 14,
      color: colors.text,
    },
    description: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
  });

  const truncatedDescription = product.description.length > 100
    ? `${product.description.substring(0, 100)}...`
    : product.description;

  const onPress = useCallback(() => {
    navigate("product_detail", { product })
  }, [product?.id])

  return (
    <TouchableOpacity testID='productCard-btn' style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        testID='productCard-image'
        source={{ uri: product.images[0] }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text testID='productCard-title' style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text testID='produtCard-category' style={styles.category}>{product.category}</Text>

        <View style={styles.priceRatingContainer}>
          <Text testID='productCard-price' style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text testID='productCard-rating' style={styles.rating}>
            ★ {product.rating}
          </Text>
        </View>

        <Text testID='productCard-description' style={styles.description} numberOfLines={3}>
          {truncatedDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


export default ProductCard;