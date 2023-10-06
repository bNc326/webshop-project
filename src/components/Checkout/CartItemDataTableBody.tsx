import React from "react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import ShoppingCartModel from "../../model/shopping-cart";

interface Props {
  item: ShoppingCartModel.ICartItem;
}

const CartItemDataTableBody: React.FC<Props> = ({ item }) => {
  return (
    <TableBody>
      <DataRow
        image={item.image}
        title={item.title}
        amount={item.amount}
        price={{ total: item.amountPrice, base: item.price }}
      />
    </TableBody>
  );
};

export default CartItemDataTableBody;

const DataRow: React.FC<{
  image: string;
  title: string;
  amount: number;
  price: { total: number; base: number };
}> = ({ image, title, amount, price }) => {
  return (
    <TableRow>
      <DataCell value={<img src={image} alt="Cart Item" title="Cart Item" className="w-10"/>} />
      <DataCell value={<span className="text-base">{title.substring(0, 30)}..</span>} />
      <DataCell value={<span className="text-base">{amount} piece</span>} />
      <DataCell
        value={
          <div className="flex flex-col items-end">
            <span className="text-lg">${price.total.toFixed(2)}</span>
            <span className="text-sm">${price.base.toFixed(2)}</span>
          </div>
        }
      />
    </TableRow>
  );
};

const DataCell: React.FC<{ value: React.ReactNode }> = ({ value }) => {
  return <TableCell className="text-base">{value}</TableCell>;
};
