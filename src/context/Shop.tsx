import { createContext, useState, useEffect } from "react";
import ShopModel from "../model/shop";
import Post from "../assets/PostLogo.png";
import Local from "../assets/Local.png";
import UPS from "../assets/ups_logo.png";
import BankTransfer from "../assets/Bank Transfer.png";
import Cash from "../assets/Cash.png";
import PayPal from "../assets/Paypal_logo_PNG1.png";
import MasterCard from "../assets/Mastercard_logo_PNG2.png";
import Visa from "../assets/Visa_logo_PNG1.png";
export enum SortBy {
  DEFAULT = "Default",
  RATE = "Average rating",
  LOWTOHIGH = "Price: Low to High",
  HIGHTOLOW = "Price: High to Low",
}

export enum SortType {
  PRICE,
  CATEGORY,
  SORT,
}

interface Context {
  products: ShopModel.Product[];
  renderShop: ShopModel.IShop;
  isLoading: null | boolean;
  isFilterLoading: null | boolean;
  allCategories: string[];
  priceRange: number[];
  handleSort: (sortOpt: { type: SortType; value: any }) => void;
  selectShipping: (index: number) => void;
  selectPayment: (index: number) => void;
  handleSetShippingNull: () => void;
  handleSetPaymentNull: () => void;
  resetShop: () => void;
}

export const ShopContext = createContext<Context>({
  products: [],
  renderShop: {
    shippingMethods: [],
    paymentMethods: [],
    selectedShippingMethod: null,
    selectedPaymentMethod: null,
  },
  isLoading: false,
  isFilterLoading: false,
  allCategories: [],
  priceRange: [],
  handleSort: () => {},
  selectShipping: () => {},
  selectPayment: () => {},
  handleSetShippingNull: () => {},
  handleSetPaymentNull: () => {},
  resetShop: () => {},
});

const ShopContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ShopModel.Product[]>([]);
  const [renderShop, setRenderShop] = useState<ShopModel.IShop>({
    shippingMethods: [
      {
        title: "Local",
        logo: Local,
        shippingDays: "0",
        price: 0.0,
        isSelected: false,
      },
      {
        title: "Post National",
        logo: Post,
        shippingDays: "4-5",
        price: 3.99,
        isSelected: false,
      },
      {
        title: "UPS Standard",
        logo: UPS,
        shippingDays: "3-4",
        price: 5.99,
        isSelected: false,
      },
      {
        title: "UPS Air",
        logo: UPS,
        shippingDays: "2-3",
        price: 7.99,
        isSelected: false,
      },
      {
        title: "UPS Express",
        logo: UPS,
        shippingDays: "1-2",
        price: 15.99,
        isSelected: false,
      },
    ],
    paymentMethods: [
      {
        title: "Payment by cash/ card on delivery",
        logo: Cash,
        price: 2.99,
        isSelected: false,
      },
      {
        title: "Payment by Bank Transfer",
        logo: BankTransfer,
        price: 1,
        isSelected: false,
      },
      {
        title: "Payment by Mastercard",
        logo: MasterCard,
        price: 1,
        isSelected: false,
        isCard: true,
      },
      {
        title: "Payment by Visa",
        logo: Visa,
        price: 1,
        isSelected: false,
        isCard: true,
      },
      {
        title: "Payment by PayPal",
        logo: PayPal,
        price: 1,
        isSelected: false,
        isCard: true,
      },
    ],
    selectedPaymentMethod: {
      title: "Payment by Mastercard",
      logo: MasterCard,
      price: 1,
      isSelected: false,
      isCard: true,
    },
    selectedShippingMethod: undefined,
  });
  const shop = new ShopModel.Shop(renderShop, setRenderShop);

  const [filteredProducts, setFilteredProducts] = useState<ShopModel.Product[]>(
    []
  );
  const [isLoading, setLoading] = useState<null | boolean>(null);
  const [isFilterLoading, setFilterLoading] = useState<null | boolean>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);

  const [sortByPrice, setSortByPrice] = useState<number[]>([]);
  const [sortByCategory, setSortByCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DEFAULT);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "https://fakestoreapi.com/products";
      setLoading(true);
      try {
        const res = await fetch(url);

        const data: ShopModel.IProduct[] = await res.json();

        const productsData: ShopModel.Product[] = [];
        const categoriesData: string[] = [];
        const priceData: number[] = [];
        categoriesData.push("All");
        data.map((product) => {
          productsData.push(new ShopModel.Product({ ...product }));
          priceData.push(product.price);
          if (!categoriesData.includes(product.category)) {
            categoriesData.push(product.category);
          }
        });

        setPriceRange([Math.min(...priceData), Math.max(...priceData)]);
        setAllCategories(categoriesData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleFilter = (): ShopModel.Product[] => {
      let filteredArray: ShopModel.Product[] = [];
      filteredArray = products
        .filter((item) =>
          sortByPrice.length > 0
            ? item.price >= sortByPrice[0] && item.price <= sortByPrice[1]
            : item
        )
        .filter((item) =>
          sortByCategory.length > 0 && sortByCategory !== "All"
            ? item.category === sortByCategory
            : item
        );
      switch (sortBy) {
        case SortBy.DEFAULT:
          filteredArray.sort(() => -1);
          break;
        case SortBy.RATE:
          filteredArray.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        case SortBy.LOWTOHIGH:
          filteredArray.sort((a, b) => a.price - b.price);
          break;
        case SortBy.HIGHTOLOW:
          filteredArray.sort((a, b) => b.price - a.price);
          break;
        default:
          filteredArray.sort(() => -1);
      }
      if (
        sortByPrice.length === 0 &&
        sortByCategory === "" &&
        sortBy === SortBy.DEFAULT
      )
        return products;
      return filteredArray;
    };
    const cleanup = setTimeout(() => {
      if (products.length !== 0) {
        setFilteredProducts([]);
        const filteredArray = handleFilter();
        setFilteredProducts(filteredArray);
        setFilterLoading(false);
      }
    }, 500);
    setFilterLoading(true);
    return () => clearTimeout(cleanup);
  }, [products, sortByPrice, sortByCategory, sortBy]);

  const handleSort = (sortOpt: { type: SortType; value: any }) => {
    const { type, value } = sortOpt;
    switch (type) {
      case SortType.PRICE:
        setSortByPrice(value as number[]);
        break;
      case SortType.CATEGORY:
        setSortByCategory(value as string);
        break;
      case SortType.SORT:
        setSortBy(value as SortBy);
        break;
      default:
    }
  };

  const selectShipping = (index: number) => {
    shop.selectShipping(index);
  };

  const selectPayment = (index: number) => {
    shop.selectPayment(index);
  };

  const handleSetShippingNull = () => {
    shop.setShippingNull();
  };
  const handleSetPaymentNull = () => {
    shop.setPaymentNull();
  };

  const resetShop = () => {
    shop.resetShop();
  };

  const contextValue: Context = {
    products: filteredProducts,
    renderShop,
    isLoading,
    isFilterLoading,
    allCategories,
    priceRange,
    handleSort,
    selectShipping,
    selectPayment,
    handleSetShippingNull,
    handleSetPaymentNull,
    resetShop,
  };
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
