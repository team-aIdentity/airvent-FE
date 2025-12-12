"use client";

import { useParams } from "next/navigation";
import { PRODUCTS, type ProductType } from "../constants/products";

export const useProduct = () => {
  const params = useParams();
  const productType = params?.productType as string;
  const product = PRODUCTS[productType as ProductType];

  return {
    product,
    productType: productType as ProductType,
    isLoading: !product,
  };
};
