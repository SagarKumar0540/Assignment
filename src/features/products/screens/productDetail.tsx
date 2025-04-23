import React, { memo } from "react"
import { View, Text, Image, StyleSheet, ScrollView, Modal, Animated, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from "../../../context/themeContext";
import ThemeToggleBtn from "../../../common/components/themeToggleBtn";
import { goBack } from "../../../navigation/navigationService";
import { ProductDetailProps } from "../models/productDetailPropsModel";

const ProductDetail = memo((props:ProductDetailProps) => {
    const { colors, } = useTheme()
    const { product } = props?.route?.params || {}

    const styles = StyleSheet.create({
        backButton: {
            position: "absolute",
            top: 50,
            left: 20,
            zIndex: 111,
            height: 50,
            width: 50,
            backgroundColor: colors.card,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: "center"
        },
        toggleButton: {
            position: "absolute",
            top: 50,
            right: 20,
            zIndex: 111,
            height: 50,
            width: 50,
            backgroundColor: colors.card,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: "center"
        },
        productImage: {
            width: '100%',
            height: 300,
            marginVertical: 20,
        },
        titleContainer: {
            paddingHorizontal: 20,
            marginBottom: 15,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 5,
        },
        category: {
            fontSize: 14,
            color: colors.secondary,
            fontWeight: '600',
            textTransform: 'capitalize'
        },
        priceRatingContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 20,
        },
        price: {
            fontSize: 22,
            fontWeight: 'bold',
            color: colors.text,
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        ratingText: {
            fontSize: 16,
            color: colors.text,
        },
        descriptionContainer: {
            paddingHorizontal: 20,
            paddingBottom: 30,
        },
        descriptionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 10,
        },
        description: {
            fontSize: 16,
            color: colors.text,
            lineHeight: 24,
            textAlign: 'justify'
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} >
            <ScrollView showsVerticalScrollIndicator={false} >
                <TouchableOpacity
                    testID="back-btn"
                    style={styles.backButton}
                    onPress={goBack}
                >
                    <Icon name="chevron-left" size={22} color="black" />
                </TouchableOpacity>
                <ThemeToggleBtn
                    containerStyle={styles.toggleButton}
                />
                <Image
                    testID="product-image"
                    source={{ uri: product?.images[0] }}
                    style={styles.productImage}
                    resizeMode="contain"
                />

                <View style={styles.titleContainer}>
                    <Text testID="product-title" style={styles.title}>{product?.title}</Text>
                    <Text testID="product-category" style={styles.category}>{product?.category}</Text>
                </View>

                <View style={styles.priceRatingContainer}>
                    <Text testID="product-price" style={styles.price}>${product?.price.toFixed(2)}</Text>
                    <View style={styles.ratingContainer}>
                        <Text testID="product-rating" style={styles.ratingText}>
                            ★ {product?.rating}
                        </Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text testID="product-description" style={styles.description}>{product?.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
})



export default ProductDetail
