import { PRODUCTS, type ProductType } from "@/constants/products";
import ProductDetail from "../components/ProductDetail";
import Information from "../components/Information";
import Benefits from "../components/Benefits";
import Specs from "../components/Specs";

type Props = {
  params: Promise<{
    productType: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { productType } = await params;
  const product = PRODUCTS[productType as ProductType];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductDetail productType={productType as ProductType} {...product} />
      <Information productType={productType as ProductType} />
      <Benefits />
      <Specs productType={productType as ProductType} />
    </>
  );
}
