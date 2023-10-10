import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../context/Shop";
import PaymentGateway from "../PaymentGateway";
import { CircularProgress } from "@mui/material";
import OrderResult from "../OrderResult";
import { CheckoutContext } from "../../../context/Checkout";
import { ShoppingCartContext } from "../../../context/ShoppingCart";

const LastStep = () => {
  const shopCtx = useContext(ShopContext);
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const checkoutCtx = useContext(CheckoutContext);
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    setLoading(true);
    const cleanup = setTimeout(() => {
      if (!shopCtx.renderShop.selectedPaymentMethod?.isCard) {
        checkoutCtx.handleForwardStep();
        shoppingCartCtx.resetCart();
        shopCtx.resetShop();
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(cleanup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutCtx, shopCtx.renderShop.selectedPaymentMethod?.isCard]);

  useEffect(() => {
    if (paymentSuccess === true) {
      checkoutCtx.handleForwardStep();
      shoppingCartCtx.resetCart();
      shopCtx.resetShop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentSuccess, checkoutCtx]);
  return (
    <>
      {isLoading ? (
        <div className="w-full flex items-center justify-center h-full p-16">
          <CircularProgress />
        </div>
      ) : (
        <PaymentGateway setPaymentSuccess={setPaymentSuccess} />
      )}
    </>
  );
};

export default LastStep;
