import { useParams } from "react-router-dom";
import { ProductDetails } from "../modules/Products";
import { AddToCartButton } from "../modules/Cart";

export const Product = () => {
  const { productId } = useParams();

  return (
    <ProductDetails
      productId={productId}
      actions={<AddToCartButton productId={productId} />}
    />
  );
};
