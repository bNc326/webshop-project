import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingCart from "../components/Shop/ShoppingCart";
import CartTotal from "../components/Shop/CartTotal";
import { Breadcrumb } from "flowbite-react";
import { MdHome, MdShoppingCartCheckout, MdShoppingCart } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { CheckoutContext } from "../context/Checkout";

const CartRoot = () => {
  const checkoutCtx = useContext(CheckoutContext)
  const navigate = useNavigate();
  const location = useLocation();
  const links = location.pathname.split("/");
  const icons: { [key: string]: IconType } = {
    "": MdHome,
    cart: MdShoppingCart,
    checkout: MdShoppingCartCheckout,
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col pb-8 px-4">
        <Breadcrumb className="py-4">
          {links.map((link, index, arr) => (
            <Breadcrumb.Item
              key={index}
              onClick={() => {
                if (index !== arr.length - 1) {
                  navigate("/" + link);
                }
              }}
              icon={icons[link]}
            >
              <span
                className={`text-base text-gray-700  ${
                  index !== arr.length - 1
                    ? "cursor-pointer hover:text-gray-900"
                    : "cursor-default"
                } `}
              >
                {(link.length === 0 && "Home") || link}
              </span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div className="flex flex-col tablet:flex-row">
          <div className={`w-full ${checkoutCtx.activeStep < 3 ? "tablet:w-3/5" : "w-full"}`}>
            <Outlet />
          </div>
          <div className={`w-full ${checkoutCtx.activeStep < 3 ? "tablet:w-2/5" : "hidden"}`}>
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRoot;
