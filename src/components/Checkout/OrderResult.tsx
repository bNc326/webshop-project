import React, { useEffect, useContext } from "react";
import Lottie from "lottie-react";
import SuccessLottie from "../../assets/animation_lm9batiy.json";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../context/Checkout";
import { ShopContext } from "../../context/Shop";
import { ShoppingCartContext } from "../../context/ShoppingCart";

const OrderResult = () => {
  const navigate = useNavigate();
  const checkoutCtx = useContext(CheckoutContext);
  const shopCtx = useContext(ShopContext);
  const shoppingCartCtx = useContext(ShoppingCartContext);

  useEffect(() => {
    setTimeout(handleResetAll, 20000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResetAll = () => {
    checkoutCtx.resetCheckout();
    shopCtx.resetShop();
    shoppingCartCtx.resetCart();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="w-[250px] h-[250px]">
        <Lottie animationData={SuccessLottie} loop={false} />
      </div>
      <h2 className="text-xl">
        Your order ID:{" "}
        <span className="font-semibold text-xl">
          {uuid().split("-")[0].toUpperCase()}
        </span>
      </h2>
      <Button variant="contained" onClick={handleResetAll}>
        Back to store
      </Button>
    </div>
  );
};

export default OrderResult;
