import { useContext } from "react";
import { MdClose, MdRemove, MdAdd } from "react-icons/md";
import ShoppingCartModel from "../../model/shopping-cart";
import { TextInput } from "flowbite-react";
import { ShoppingCartContext } from "../../context/ShoppingCart";
import { Icon, IconButton } from "@mui/material";

interface Props {
  item: ShoppingCartModel.CartItem;
}
const CartItem: React.FC<Props> = ({ item }) => {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  return (
    <div className="w-full flex border-b-2 border-gray-200 py-4">
      <div className="flex items-center gap-4 w-max">
        <div>
          <MdClose
            size={24}
            onClick={() => shoppingCartCtx.handleRemoveItem(item.id)}
          />
        </div>
        <img src={item.image} alt="" className="max-w-[60px]" />
      </div>
      <div className="w-full flex flex-col gap-2 pl-4">
        <p className="w-full break-words">{item.title}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IconButton
              onClick={() => shoppingCartCtx.handleDecreaseAmount(item)}
            >
              <MdRemove size={24} />
            </IconButton>
            <input
              type="text"
              readOnly
              value={item.amount}
              className="w-5 text-center"
            />
            <IconButton
              onClick={() => shoppingCartCtx.handleIncreaseAmount(item)}
            >
              <MdAdd size={24} />
            </IconButton>
          </div>
          <span className="font-semibold text-lg leading-5 min-w-[100px] flex flex-col items-end">
            ${item.amountPrice.toFixed(2)}
            <small className="text-sm opacity-60">${item.price}</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
