import React, { useContext, useState } from "react";
import CheckoutForm from "../CheckoutForm";
import { CheckoutContext } from "../../../context/Checkout";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
const Order = () => {
  const CheckoutCtx = useContext(CheckoutContext);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-semibold opacity-70 py-4 w-full text-center">
        Order information
      </h3>
      <CheckoutForm
        isFirstForm
        input={{
          get: CheckoutCtx.inputValidate,
          set: CheckoutCtx.setInputValidate,
        }}
      />
      <div>
        <FormControlLabel
          control={
            <Checkbox
              onChange={CheckoutCtx.handleDifferentShippingInformation}
              checked={CheckoutCtx.isDifferentShippingInformation as boolean}
            />
          }
          label="Shipping information is different to order information."
        />
      </div>
      {CheckoutCtx.isDifferentShippingInformation && (
        <>
          <h3 className="text-3xl font-semibold opacity-70 py-4 w-full text-center">
            Shipping information
          </h3>
          <CheckoutForm
            input={{
              get: CheckoutCtx.shippingInputValidate,
              set: CheckoutCtx.setShippingInputValidate,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Order;
