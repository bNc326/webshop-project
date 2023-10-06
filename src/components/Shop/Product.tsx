import React, { useContext } from "react";
import ShopModel from "../../model/shop";
import ProductCard from "./ProductCard";
import { Alert } from "flowbite-react";
import { MdWarning } from "react-icons/md";
import { ShopContext } from "../../context/Shop";

interface Props {
  products: ShopModel.Product[];
}

const Product: React.FC<Props> = ({ products }) => {
  const shopCtx = useContext(ShopContext);
  return (
    <div className="w-full flex flex-wrap gap-4 p-4">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
      {!shopCtx.isLoading &&
        !shopCtx.isFilterLoading &&
        products.length === 0 && (
          <Alert color={"failure"} className="w-full h-max" icon={MdWarning}>
            <div className="flex gap-1 text-base">
              <span className="font-bold">Oops!</span> <p>Item not found!</p>
            </div>
          </Alert>
        )}
    </div>
  );
};

export default Product;
