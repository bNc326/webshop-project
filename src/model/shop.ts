namespace ShopModel {
  export interface Rating {
    rate: number;
    count: number;
  }

  export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }

  export class Product implements IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    constructor(product: IProduct) {
      const { id, category, description, image, price, rating, title } =
        product;
      this.id = id;
      this.title = title;
      this.price = price;
      this.description = description;
      this.category = category;
      this.image = image;
      this.rating = rating;
    }
  }

  export interface IShippingMethod {
    logo: string;
    title: string;
    shippingDays: string;
    price: number;
    isSelected: boolean;
  }

  export interface IPaymentMethod {
    logo: string;
    title: string;
    price: number;
    isSelected: boolean;
    isCard?: boolean;
  }

  export interface IShop {
    shippingMethods: IShippingMethod[];
    paymentMethods: IPaymentMethod[];
    selectedShippingMethod: null | IShippingMethod | undefined;
    selectedPaymentMethod: null | IPaymentMethod | undefined;
  }

  export class Shop implements IShop {
    shippingMethods: IShippingMethod[];
    paymentMethods: IPaymentMethod[];
    selectedShippingMethod: IShippingMethod | null | undefined;
    selectedPaymentMethod: IPaymentMethod | null | undefined;
    private setCart: React.Dispatch<React.SetStateAction<IShop>>;

    constructor(
      shop: IShop,
      setCart: React.Dispatch<React.SetStateAction<IShop>>
    ) {
      const {
        shippingMethods,
        paymentMethods,
        selectedShippingMethod,
        selectedPaymentMethod,
      } = shop;
      this.shippingMethods = shippingMethods;
      this.paymentMethods = paymentMethods;
      this.selectedShippingMethod = selectedShippingMethod;
      this.selectedPaymentMethod = selectedPaymentMethod;
      this.setCart = setCart;
    }

    selectShipping(index: number) {
      const items = this.shippingMethods;
      items.map((item, i) => {
        if (i === index) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      });
      this.selectedShippingMethod = items[index];
      this.renderShop();
    }

    selectPayment(index: number) {
      const items = this.paymentMethods;
      items.map((item, i) => {
        if (i === index) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      });
      this.selectedPaymentMethod = items[index];
      this.renderShop();
    }

    setShippingNull() {
      this.selectedShippingMethod = null;
      this.renderShop();
    }

    setPaymentNull() {
      this.selectedPaymentMethod = null;
      this.renderShop();
    }

    resetShop() {
      this.selectedPaymentMethod = null;
      this.selectedShippingMethod = null;
      this.renderShop();
    }

    renderShop() {
      this.setCart({
        paymentMethods: this.paymentMethods,
        shippingMethods: this.shippingMethods,
        selectedPaymentMethod: this.selectedPaymentMethod,
        selectedShippingMethod: this.selectedShippingMethod,
      });
    }
  }
}

export default ShopModel;
