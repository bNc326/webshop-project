namespace ShoppingCartModel {
  export interface ICartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    amount: number;
    amountPrice: number;
  }

  export class CartItem implements ICartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    amount: number;
    amountPrice: number = 0;

    constructor(item: {
      id: number;
      title: string;
      image: string;
      price: number;
      amount: number;
    }) {
      const { id, title, image, price, amount } = item;
      this.id = id;
      this.title = title;
      this.image = image;
      this.price = price;
      this.amount = amount;
      this.calcAmountPrice();
    }

    increaseAmount(increaseValue?: number) {
      const value = increaseValue || 1;
      this.amount += value;
      this.calcAmountPrice();
    }

    decreaseAmount() {
      const value = 1;
      if (this.amount === 0) return;
      this.amount -= value;
      this.calcAmountPrice();
    }

    private calcAmountPrice() {
      this.amountPrice = this.price * this.amount;
    }
  }

  enum CouponType {
    PRICE,
    PERCENT,
    SHIPPING,
  }

  interface ICoupon {
    coupon: string;
    type: CouponType;
    value: number;
    decorator: string;
  }

  export interface IShoppingCart {
    items: CartItem[];
    totalAmount: number;
    totalItemPrice: number;
    totalPrice: number;
    shippingPrice: number;
    paymentPrice: number;
    discountedPrice: number | null;
    coupon: ICoupon[];
    appliedCoupon: null | ICoupon;
  }

  export class ShoppingCart implements IShoppingCart {
    items: CartItem[];
    totalAmount: number;
    totalItemPrice: number;
    totalPrice: number;
    shippingPrice: number;
    paymentPrice: number;
    discountedPrice: number | null;
    coupon: ICoupon[] = [
      {
        coupon: "DISCOUNT10",
        type: CouponType.PERCENT,
        value: 10,
        decorator: "10%",
      },
      {
        coupon: "DISCOUNT20",
        type: CouponType.PERCENT,
        value: 20,
        decorator: "20%",
      },
      {
        coupon: "PRICE10",
        type: CouponType.PRICE,
        value: 10,
        decorator: "$10",
      },
    ];
    appliedCoupon: null | ICoupon;
    private setCart: React.Dispatch<React.SetStateAction<IShoppingCart>>;

    constructor(
      cart: IShoppingCart,
      setCart: React.Dispatch<React.SetStateAction<IShoppingCart>>
    ) {
      this.items = cart.items;
      this.totalAmount = cart.totalAmount;
      this.totalItemPrice = cart.totalItemPrice;
      this.totalPrice = cart.totalPrice;
      this.shippingPrice = cart.shippingPrice;
      this.paymentPrice = cart.paymentPrice;
      this.appliedCoupon = cart.appliedCoupon;
      this.discountedPrice = cart.discountedPrice;
      this.setCart = setCart;
    }

    addItem(cartItem: CartItem) {
      if (!this.isIdExist(cartItem.id)) {
        this.items.push(cartItem);
        this.renderCart();
      } else {
        const item = this.getItem(cartItem.id);
        item.increaseAmount();
        this.renderCart();
      }
    }

    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id);
      this.renderCart();
    }

    resetCart() {
      this.items = [];
      this.appliedCoupon = null;
      this.discountedPrice = null;
      this.shippingPrice = 0;
      this.paymentPrice = 0;
      this.renderCart();
    }

    increaseAmount(cartItem: CartItem) {
      const item = this.getItem(cartItem.id);
      item.increaseAmount();
      this.renderCart();
    }

    decreaseAmount(cartItem: CartItem) {
      const item = this.getItem(cartItem.id);
      if (item.amount === 1) {
        this.removeItem(item.id);
      }
      item.decreaseAmount();
      this.renderCart();
    }

    addShippingPrice(value: number) {
      this.shippingPrice = value;
      this.renderCart();
    }

    addPaymentPrice(value: number) {
      this.paymentPrice = value;
      this.renderCart();
    }

    isIdExist(id: number): boolean {
      const foundItem = this.items.find((item) => item.id === id);
      if (!foundItem) {
        return false;
      } else {
        return true;
      }
    }

    checkCoupon(coupon: string) {
      // check coupon is valid
      this.coupon.map((c) => {
        if (!this.appliedCoupon && c.coupon === coupon) {
          this.appliedCoupon = c;
          this.renderCart();
        }
      });
    }

    removeCoupon() {
      this.appliedCoupon = null;
      this.discountedPrice = null;
      this.renderCart();
    }

    checkLocalCart = () => {
      const cart = this.getLocalCart();

      if (cart) {
        const updateItems: CartItem[] = [];
        cart.map((item) => updateItems.push(new CartItem({ ...item })));
        this.items = updateItems;
      } else {
        this.setLocalCart(this.items);
      }

      this.renderCart();
    };

    private setLocalCart(cart: CartItem[]) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }

    private getLocalCart() {
      return JSON.parse(window.localStorage.getItem("cart") as string) as
        | CartItem[]
        | []
        | null;
    }

    private calcTotalPrice() {
      let price = 0;
      this.items.map((item) => (price += item.amountPrice));
      this.totalItemPrice = price;

      if (this.appliedCoupon) {
        const c = this.appliedCoupon;
        switch (c.type) {
          // price x percent
          case CouponType.PERCENT:
            const resultValue = price * (c.value / 100);
            this.discountedPrice = resultValue;
            price -= resultValue;
            break;
          // price - value
          case CouponType.PRICE:
            this.discountedPrice = c.value;
            price -= c.value;
            break;
          // shipping - free
          case CouponType.SHIPPING:
            this.shippingPrice = 0;
            break;
          default:
        }
      }
      this.totalPrice = price + this.shippingPrice + this.paymentPrice;
    }

    private calcTotalAmount() {
      let amount = 0;
      this.items.map((item) => (amount += item.amount));
      this.totalAmount = amount;
    }

    private getItem(id: number): CartItem {
      return this.items.find((item) => item.id === id) as CartItem;
    }

    private renderCart() {
      this.calcTotalPrice();
      this.calcTotalAmount();
      this.setCart({
        items: this.items,
        totalAmount: this.totalAmount,
        totalItemPrice: this.totalItemPrice,
        totalPrice: this.totalPrice,
        shippingPrice: this.shippingPrice,
        paymentPrice: this.paymentPrice,
        discountedPrice: this.discountedPrice,
        coupon: this.coupon,
        appliedCoupon: this.appliedCoupon,
      });
      this.setLocalCart(this.items);
    }
  }
}

export default ShoppingCartModel;
