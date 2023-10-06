import React, { useContext } from "react";
import Menu from "@mui/material/Menu";
import PreviewCartTable from "./PreviewCartTable";
import { ShoppingCartContext } from "../../../context/ShoppingCart";
import PreviewCartTableItem from "./PreviewCartTableItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
interface Props {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleCloseMenu: () => void;
}

const PreviewCart: React.FC<Props> = ({
  isOpen,
  anchorEl,
  handleCloseMenu,
}) => {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <Menu
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <PreviewCartTable>
        <>
          {shoppingCartCtx.renderCart.items.map((item) => (
            <PreviewCartTableItem key={item.id} item={item} />
          ))}
        </>
      </PreviewCartTable>
      <div className="flex flex-col items-center py-4 gap-2">
        <h3 className="text-xl">Total price</h3>
        <Divider sx={{height: "3px"}} />
        <span className="text-2xl font-semibold">
          ${shoppingCartCtx.renderCart.totalPrice.toFixed(2)}
        </span>
      </div>
      <div className="px-4 pb-4 flex items-center gap-4">
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/cart");
            handleCloseMenu();
          }}
        >
          view cart
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/cart/checkout");
            handleCloseMenu();
          }}
        >
          Checkout
        </Button>
      </div>
    </Menu>
  );
};

export default PreviewCart;
