import { TableCell, TableRow } from "@mui/material";
import { Radio } from "flowbite-react";
import React, { useContext } from "react";
import { ShopContext } from "../../context/Shop";
import { ShoppingCartContext } from "../../context/ShoppingCart";

interface Props {
  index: number;
  logo: string;
  title: string;
  shippingDays: string;
  price: number;
  isSelected: boolean;
  withoutRadio?: boolean;
}

const ShippingMethod: React.FC<Props> = ({
  index,
  logo,
  title,
  shippingDays,
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
        shopCtx.selectShipping(index);
        cartCtx.handleChangeShippingPrice(price);
      }}
      className={`${
        !withoutRadio ? "cursor-pointer" : ""
      } hover:bg-gray-100 transition-all ease-in-out duration-300 ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      {!withoutRadio && (
        <TableCell>
          <Radio
            checked={isSelected}
            name="shipping"
            onChange={() => {
              shopCtx.selectShipping(index);
              cartCtx.handleChangeShippingPrice(price);
            }}
          />
        </TableCell>
      )}

      <TableCell>
        <img src={logo} alt="shipping method" className="w-10" />
      </TableCell>
      <TableCell>
        <span className="font-semibold">{title}</span>
      </TableCell>
      <TableCell>
        <span>{shippingDays} days</span>
      </TableCell>
      <TableCell>
        <span>${price.toFixed(2)}</span>
      </TableCell>
    </TableRow>
  );
};

export default ShippingMethod;
