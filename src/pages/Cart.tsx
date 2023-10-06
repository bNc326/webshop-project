import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/Shop/ShoppingCart";

const Cart = () => {
  const navigate = useNavigate();
  return <ShoppingCart />;
};

export default Cart;
