import { useContext } from "react";
import { MdClose, MdRemove, MdAdd } from "react-icons/md";
import ShoppingCartModel from "../../model/shopping-cart";
import { TextInput } from "flowbite-react";
import { ShoppingCartContext } from "../../context/ShoppingCart";

interface Props {
  item: ShoppingCartModel.CartItem;
}
const CartItem: React.FC<Props> = ({ item }) => {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  return (
    <div className="w-full flex justify-between border-b-2 border-gray-200 py-4">
      <div className="flex items-center gap-4 w-full">
        <div>
          <MdClose
            size={24}
            onClick={() => shoppingCartCtx.handleRemoveItem(item.id)}
          />
        </div>
        <img src={item.image} alt="" className="w-[60px]" />

        <p>{item.title}</p>
      </div>
      <div className="flex items-center gap-4 w-1/2 justify-end pr-4">
        <div className="flex gap-1 items-center w-full justify-end">
          <MdRemove
            size={20}
            onClick={() => shoppingCartCtx.handleDecreaseAmount(item)}
          />
          <div className="w-12">
            <TextInput
              theme={{
                base: "",
                field: {
                  input: {
                    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 text-center",
                  },
                },
              }}
              type="text"
              readOnly
              value={item.amount}
            />
          </div>
          <MdAdd
            size={20}
            onClick={() => shoppingCartCtx.handleIncreaseAmount(item)}
          />
        </div>
        <span className="font-semibold text-lg leading-7 min-w-[100px] flex flex-col items-end">
          ${item.amountPrice.toFixed(2)}
          <small className="text-sm opacity-60">${item.price}</small>
        </span>
      </div>
    </div>
  );
};

export default CartItem;
