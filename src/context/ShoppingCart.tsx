import { memo, createContext, useState, useEffect } from "react";
import ShoppingCartModel from "../model/shopping-cart";

interface Context {
  renderCart: ShoppingCartModel.IShoppingCart;
  handleAddItem: (item: ShoppingCartModel.CartItem) => void;
  handleRemoveItem: (id: number) => void;
  handleIncreaseAmount: (item: ShoppingCartModel.CartItem) => void;
  handleDecreaseAmount: (item: ShoppingCartModel.CartItem) => void;
  handleChangeShippingPrice: (value: number) => void;
  handleChangePaymentPrice: (value: number) => void;
  isIdExist: (id: number) => boolean;
  checkCoupon: (coupon: string) => void;
  removeCoupon: () => void;
  resetCart: () => void;
}

export const ShoppingCartContext = createContext<Context>({
  renderCart: {
    items: [],
    totalAmount: 0,
    totalItemPrice: 0,
    totalPrice: 0,
    shippingPrice: 0,
    paymentPrice: 0,
    discountedPrice: null,
    coupon: [],
    appliedCoupon: null,
  },
  handleAddItem: () => {},
  handleRemoveItem: () => {},
  handleIncreaseAmount: () => {},
  handleDecreaseAmount: () => {},
  handleChangeShippingPrice: () => {},
  handleChangePaymentPrice: () => {},
  isIdExist: () => false,
  checkCoupon: () => {},
  removeCoupon: () => {},
  resetCart: () => {},
});

const ShoppingCartContextProvider: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [renderCart, setRenderCart] = useState<ShoppingCartModel.IShoppingCart>(
    {
      items: [],
      totalAmount: 0,
      totalItemPrice: 0,
      totalPrice: 0,
      shippingPrice: 0,
      paymentPrice: 0,
      discountedPrice: null,
      coupon: [],
      appliedCoupon: null,
    }
  );
  const cart = new ShoppingCartModel.ShoppingCart(renderCart, setRenderCart);

  useEffect(() => {
    const cleanup = setTimeout(() => {
      cart.checkLocalCart();
    }, 100);

    return () => clearTimeout(cleanup);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = (item: ShoppingCartModel.CartItem) => {
    cart.addItem(item);
  };
  const handleRemoveItem = (id: number) => {
    cart.removeItem(id);
  };

  const handleIncreaseAmount = (item: ShoppingCartModel.CartItem) => {
    cart.increaseAmount(item);
  };
  const handleDecreaseAmount = (item: ShoppingCartModel.CartItem) => {
    cart.decreaseAmount(item);
  };

  const handleChangeShippingPrice = (value: number) => {
    cart.addShippingPrice(value);
  };

  const handleChangePaymentPrice = (value: number) => {
    cart.addPaymentPrice(value);
  };

  const isIdExist = (id: number): boolean => {
    return cart.isIdExist(id);
  };

  const checkCoupon = (coupon: string) => {
    cart.checkCoupon(coupon);
  };

  const removeCoupon = () => {
    cart.removeCoupon();
  };

  const resetCart = () => {
    cart.resetCart();
  };

  const contextValue: Context = {
    renderCart,
    handleAddItem,
    handleRemoveItem,
    handleIncreaseAmount,
    handleDecreaseAmount,
    handleChangeShippingPrice,
    handleChangePaymentPrice,
    isIdExist,
    checkCoupon,
    removeCoupon,
    resetCart,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default memo(ShoppingCartContextProvider);
