import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCart";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

const ShoppingCart = () => {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl pb-4">Shopping Cart</h2>
      <div className="flex flex-col">
        {shoppingCartCtx.renderCart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        {shoppingCartCtx.renderCart.items.length === 0 && (
          <Alert severity="warning">
            Your cart is empty{" "}
            <Link to={"/"} className="font-semibold">
              Go to shop!
            </Link>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
