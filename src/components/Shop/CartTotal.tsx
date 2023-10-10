import React, { useContext, useRef, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCart";
import { TextField, InputAdornment, Alert, AlertTitle } from "@mui/material";
import {
  MdShoppingCartCheckout,
  MdPriceCheck,
  MdLocalShipping,
  MdClose,
} from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiSolidCoupon } from "react-icons/bi";
import { IconType } from "react-icons/lib";
import Button from "@mui/material/Button";
import { CheckoutContext } from "../../context/Checkout";
import { useLocation, useNavigate } from "react-router-dom";

const CartTotal = () => {
  const [couponInputValue, setCouponInputValue] = useState<null | string>(null);
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const checkoutCtx = useContext(CheckoutContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCheckCoupon = () => {
    const value = couponInputValue;
    if (value && value.length > 0) {
      shoppingCartCtx.checkCoupon(value);
    }
  };

  const handleClickCheckout = () => {
    if (location.pathname === "/cart") {
      navigate("/cart/checkout");
    }

    if (
      location.pathname === "/cart/checkout" &&
      checkoutCtx.activeStep === 2
    ) {
      console.log("checkout");
      checkoutCtx.handleForwardStep();
    }
  };

  return (
    <div className="w-full p-4 flex flex-col gap-6">
      <h2 className="font-semibold text-dynamicTitle3 pb-4">Cart Totals</h2>
      <div className="flex flex-col gap-4 text-2xl">
        <TotalItem
          title="Item amount"
          value={shoppingCartCtx.renderCart.totalAmount}
        />
        <TotalItem
          title="Subtotal"
          value={`$${shoppingCartCtx.renderCart.totalItemPrice.toFixed(2)}`}
        />
        <TotalItem
          title="Shipping"
          value={`$${shoppingCartCtx.renderCart.shippingPrice.toFixed(2)}`}
        />
        <TotalItem
          title="Payment"
          value={`$${shoppingCartCtx.renderCart.paymentPrice.toFixed(2)}`}
        />
        <TotalItem title="VAT" value={"0%"} />
      </div>
      <div>
        <span className="block w-full h-[2px] bg-gray-200"></span>
        <div className="flex justify-between items-center text-2xl py-4">
          <p>Total</p>
          <div className="font-semibold flex flex-col items-end">
            ${shoppingCartCtx.renderCart.totalPrice.toFixed(2)}
            {shoppingCartCtx.renderCart.discountedPrice && (
              <span className="text-xl opacity-50">
                - ${shoppingCartCtx.renderCart.discountedPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {shoppingCartCtx.renderCart.appliedCoupon && (
          <>
            <div className="flex justify-between items-center text-xl py-4 text-green-500">
              <div className="flex gap-1 items-center">
                <MdClose
                  size="20"
                  color="black"
                  className="cursor-pointer"
                  onClick={shoppingCartCtx.removeCoupon}
                />
                <p>Discount</p>
              </div>
              <p className="font-semibold">
                -{shoppingCartCtx.renderCart.appliedCoupon.decorator}
              </p>
            </div>
            <Alert
              severity="info"
              variant="outlined"
              sx={{ fontSize: "1.125rem" }}
            >
              <AlertTitle sx={{ fontSize: "1.125rem" }}>Info</AlertTitle>
              This discount applies to{" "}
              <span className="font-semibold">subtotal</span> only! Shipment &
              Payment price is fixed.
            </Alert>
          </>
        )}
      </div>
      {(location.pathname === "/cart" ||
        (location.pathname === "/cart/checkout" &&
          checkoutCtx.activeStep === 2)) && (
        <Button
          onClick={handleClickCheckout}
          variant="contained"
          color="primary"
          disabled={
            shoppingCartCtx.renderCart.items.length === 0 ? true : false
          }
          startIcon={<MdShoppingCartCheckout size={20} />}
        >
          <span className="text-lg font-semibold" color="">
            {location.pathname === "/cart" ? "Checkout" : "Order send"}
          </span>
        </Button>
      )}

      {shoppingCartCtx.renderCart.appliedCoupon === null && (
        <div className="flex flex-col gap-4">
          <TextField
            variant="outlined"
            label="Apply coupon"
            fullWidth
            size="small"
            placeholder="DISCOUNT10"
            value={couponInputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCouponInputValue(e.target.value.toUpperCase())
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BiSolidCoupon size={20} />
                </InputAdornment>
              ),
            }}
          />
          <Button onClick={handleCheckCoupon}>
            <span className="font-semibold">Check Coupon</span>
          </Button>
        </div>
      )}

      <FeatureCard
        title="30-day money back guarantee!"
        desc="You don't like it? Send back to us and we pay back!"
        Icon={MdPriceCheck}
      />
      <FeatureCard
        title="Secure Payment"
        desc="100% secure payment via credit card."
        Icon={RiSecurePaymentFill}
      />
      {/* <FeatureCard
        title="Free Shipping"
        desc="100% free shipping over $300"
        Icon={MdLocalShipping}
      /> */}
    </div>
  );
};

export default CartTotal;

const FeatureCard: React.FC<{
  title: string;
  desc: string;
  Icon: IconType;
}> = ({ title, desc, Icon }) => {
  return (
    <div className="flex items-center gap-4 border-gray-300 border p-4 rounded-lg shadow-md">
      <Icon size={48} />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p className="text-base">{desc}</p>
      </div>
    </div>
  );
};

const TotalItem: React.FC<{ title: string; value: any }> = ({
  title,
  value,
}) => {
  return (
    <div className="flex gap-4 justify-between w-full">
      <span className="w-1/2">{title}</span>
      <span className="font-semibold w-1/2">{value}</span>
    </div>
  );
};
