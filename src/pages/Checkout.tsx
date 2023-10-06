import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutModel from "../model/checkout";

import { Step, Stepper, StepLabel } from "@mui/material";
import Order from "../components/Checkout/steps/Order";
import ShippingPay from "../components/Checkout/steps/ShippingPay";
import CheckSend from "../components/Checkout/steps/CheckSend";
import LastStep from "../components/Checkout/steps/LastStep";
import { CheckoutContext } from "../context/Checkout";
import Button from "@mui/material/Button";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { ShoppingCartContext } from "../context/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import OrderResult from "../components/Checkout/OrderResult";
const Checkout = () => {
  const DUMMY_USER = new CheckoutModel.User({
    firstName: "John",
    lastName: "Doe",
    country: "Hungary",
    city: "Budapest",
    zipCode: "1000",
    address: "Example street 1/b",
    email: "example@example.com",
    callingCode: "+36",
    phone: "1231231",
    shipping: [
      new CheckoutModel.ShippingInformation({
        firstName: "John",
        lastName: "Doe",
        country: "Hungary",
        city: "Budapest",
        zipCode: "1000",
        address: "Example street 1/b",
        email: "example@example.com",
        callingCode: "+36",
        phone: "301231231",
      }),
      new CheckoutModel.ShippingInformation({
        firstName: "Becky",
        lastName: "Carroll",
        country: "Hungary",
        city: "Budapest",
        zipCode: "1000",
        address: "Example street 1/b",
        email: "example@example.com",
        callingCode: "+36",
        phone: "301231511",
      }),
    ],
  });

  const steps = [
    "Order Information",
    "Shipping & Pay",
    "Check & Send",
    "Success",
  ];
  const checkoutCtx = useContext(CheckoutContext);
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const cleanup = setTimeout(() => {
      if (shoppingCartCtx.renderCart.items.length === 0) {
        navigate("/cart");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(cleanup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading && (
        <div className="w-full flex items-center justify-center h-full">
          <CircularProgress />
        </div>
      )}
      {!isLoading && isLoading !== null && (
        <div className="w-full">
          <h2 className="font-semibold text-2xl pb-4">Checkout</h2>
          <Stepper
            activeStep={checkoutCtx.activeStep as number}
            alternativeLabel
            className="py-8"
          >
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
                error?: boolean;
              } = {};
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>
                    <span className="font-semibold">{label}</span>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {(checkoutCtx.activeStep as number) === 0 && <Order />}
          {(checkoutCtx.activeStep as number) === 1 && <ShippingPay />}
          {(checkoutCtx.activeStep as number) === 2 && <CheckSend />}
          {(checkoutCtx.activeStep as number) === 3 && <LastStep />}
          {(checkoutCtx.activeStep as number) === 4 && <OrderResult />}
          <div className="flex gap-4 py-4">
            {checkoutCtx.activeStep !== 0 && checkoutCtx.activeStep < 4 && (
              <Button
                variant="outlined"
                fullWidth
                startIcon={<MdArrowBack />}
                onClick={checkoutCtx.handleBackwardStep}
              >
                <span className="font-semibold">Back</span>
              </Button>
            )}
            {checkoutCtx.activeStep < 2 && (
              <Button
                variant="outlined"
                fullWidth
                endIcon={<MdArrowForward />}
                onClick={checkoutCtx.handleForwardStep}
              >
                <span className="font-semibold">Next</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;

export const ErrorMessage: React.FC<{ success: boolean; message: string }> = ({
  message,
  success,
}) => {
  return (
    <>
      {!success && (
        <>
          <span className="font-medium">Hoppá!</span> {message}
        </>
      )}
    </>
  );
};
