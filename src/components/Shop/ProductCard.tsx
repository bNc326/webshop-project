import React, { useEffect, useState, useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { MdDone, MdShoppingCart } from "react-icons/md";
import ShopModel from "../../model/shop";
import Rating from "@mui/material/Rating";
import { ShoppingCartContext } from "../../context/ShoppingCart";
import ShoppingCartModel from "../../model/shopping-cart";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Alert from "@mui/material/Alert";
interface Props {
  product: ShopModel.Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const cartItem = new ShoppingCartModel.CartItem({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    amount: 1,
  });

  const shoppingCartCtx = useContext(ShoppingCartContext);

  const handleOpenAlert = () => {
    shoppingCartCtx.handleAddItem(cartItem);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  return (
    <>
      <div className="w-full mobile:w-[calc(50%-1rem/2)] tablet:w-[calc(33%-1rem/2)] flex flex-col justify-between p-4 border-gray-300 border rounded-lg">
        <h2 className="pb-4 text-gray-400">{product.category}</h2>
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt="product"
            title="product"
            className="block h-[150px]"
          />
        </div>

        <div className="flex flex-col gap-2 pt-4">
          <p className="break-words">{product.title}</p>
          <Rating value={product.rating.rate} readOnly precision={0.5} />
          <div className="flex justify-between items-center">
            <span className="font-semibold">${product.price}</span>
            <div className="flex items-center gap-1">
              <AiOutlineHeart size={24} />
              {shoppingCartCtx.isIdExist(cartItem.id) ? (
                <MdDone
                  size={24}
                  onClick={handleOpenAlert}
                  className="cursor-pointer hover:opacity-70 transition-all ease-in-out duration-300"
                />
              ) : (
                <MdShoppingCart
                  size={24}
                  onClick={handleOpenAlert}
                  className="cursor-pointer hover:opacity-70 transition-all ease-in-out duration-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={isAlertOpen}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
      >
        <SnackbarContent message={"Item has been add to cart!"} />
      </Snackbar>
    </>
  );
};

export default ProductCard;
