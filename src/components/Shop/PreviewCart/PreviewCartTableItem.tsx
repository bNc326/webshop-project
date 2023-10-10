import { TableRow, TableCell } from "@mui/material";
import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { ShoppingCartContext } from "../../../context/ShoppingCart";
import ShoppingCartModel from "../../../model/shopping-cart";
interface Props {
  item: ShoppingCartModel.CartItem;
}

const PreviewCartTableItem: React.FC<Props> = ({ item }) => {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  return (
    <TableRow>
      <DataCell
        value={
          <MdClose
            size={20}
            onClick={() => shoppingCartCtx.handleRemoveItem(item.id)}
            className="cursor-pointer"
          />
        }
      />
      <DataCell
        value={
          <img
            src={item.image}
            alt="Cart Item"
            title="Cart Item"
            className="w-7"
          />
        }
      />
      <DataCell value={<span className="text-base">x{item.amount}</span>} />
      <DataCell
        value={
          <div className="flex flex-col items-end">
            <span className="text-sm">${item.amountPrice.toFixed(2)}</span>
            <span className="text-xs">${item.price.toFixed(2)}</span>
          </div>
        }
      />
    </TableRow>
  );
};

export default PreviewCartTableItem;

const DataCell: React.FC<{ value: React.ReactNode }> = ({ value }) => {
  return <TableCell className="text-base">{value}</TableCell>;
};
