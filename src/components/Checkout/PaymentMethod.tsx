import { TableRow, TableCell } from "@mui/material";
import { Radio } from "flowbite-react";
import { title } from "process";
import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop";
import { ShoppingCartContext } from "../../context/ShoppingCart";

interface Props {
  index: number;
  logo: string;
  title: string;
  price: number;
  isSelected: boolean;
  withoutRadio?: boolean;
}

const PaymentMethod: React.FC<Props> = ({
  index,
  logo,
  title,
  price,
  isSelected,
  withoutRadio,
}) => {
  const shopCtx = useContext(ShopContext);
  const cartCtx = useContext(ShoppingCartContext);
  return (
    <TableRow
      onClick={() => {
        if (withoutRadio) return;
        shopCtx.selectPayment(index);
        cartCtx.handleChangePaymentPrice(price);
      }}
      className={`${
        !withoutRadio ? "cursor-pointer" : ""
      }  hover:bg-gray-100 transition-all ease-in-out duration-300 ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      {!withoutRadio && (
        <TableCell>
          <Radio
            checked={isSelected}
            name="payment"
            onChange={() => {
              shopCtx.selectPayment(index);
              cartCtx.handleChangePaymentPrice(price);
            }}
          />
        </TableCell>
      )}

      <TableCell>
        <img src={logo} alt="payment provider" className="w-auto h-8" />
      </TableCell>
      <TableCell>
        <span className="font-semibold">{title}</span>
      </TableCell>
      <TableCell>
        <span>${price.toFixed(2)}</span>
      </TableCell>
    </TableRow>
  );
};

export default PaymentMethod;
