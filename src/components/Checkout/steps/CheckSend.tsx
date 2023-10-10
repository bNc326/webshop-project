import React, { useContext } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { ShopContext } from "../../../context/Shop";
import { CheckoutContext } from "../../../context/Checkout";
import CheckDataTableBody from "../CheckDataTableBody";
import CheckDataTable from "../CheckDataTable";
import ShippingMethod from "../ShippingMethod";
import ShopModel from "../../../model/shop";
import PaymentMethod from "../PaymentMethod";
import { ShoppingCartContext } from "../../../context/ShoppingCart";
import CartItemDataTableBody from "../CartItemDataTableBody";
const CheckSend = () => {
  const shopCtx = useContext(ShopContext);
  const checkoutCtx = useContext(CheckoutContext);
  const shoppingCartCtx = useContext(ShoppingCartContext);
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-3xl font-semibold opacity-70 py-4 w-full text-center">
        Check & Send
      </h3>
      <CheckDataTable title="Order information" fields={["Field", "Data"]}>
        <CheckDataTableBody input={checkoutCtx.inputValidate} />
      </CheckDataTable>
      <CheckDataTable title="Shipping information" fields={["Field", "Data"]}>
        {checkoutCtx.isDifferentShippingInformation ? (
          <CheckDataTableBody input={checkoutCtx.shippingInputValidate} />
        ) : (
          <CheckDataTableBody input={checkoutCtx.inputValidate} />
        )}
      </CheckDataTable>
      <CheckDataTable
        title="Shipping Method"
        fields={["Company", "Title", "Shipping day/s", "Price"]}
      >
        <ShippingMethod
          index={0}
          {...(shopCtx.renderShop
            .selectedShippingMethod as ShopModel.IShippingMethod)}
          withoutRadio
        />
      </CheckDataTable>
      <CheckDataTable
        title="Payment Method"
        fields={["Provider", "Title", "Price"]}
      >
        <PaymentMethod
          index={0}
          {...(shopCtx.renderShop
            .selectedPaymentMethod as ShopModel.IShippingMethod)}
          withoutRadio
        />
      </CheckDataTable>
      <CheckDataTable
        title="Carts"
        fields={["Product", "Title", "Amount", "Price"]}
        maxHeight={400}
      >
        <>
          {shoppingCartCtx.renderCart.items.map((item) => (
            <CartItemDataTableBody item={item} />
          ))}
        </>
      </CheckDataTable>
    </div>
  );
};

export default CheckSend;
