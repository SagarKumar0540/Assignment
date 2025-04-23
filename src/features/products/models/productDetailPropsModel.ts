import { ProductModel } from "./productModel";

export interface ProductDetailProps {
    route: { params: { product: ProductModel } } 
}