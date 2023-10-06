import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib/esm/iconContext";
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { ShoppingCartContext } from "../../context/ShoppingCart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import PreviewCart from "../Shop/PreviewCart/PreviewCart";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const shoppingCartCtx = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("run");
    if (open) return;
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    console.log("run2");
    if (!open) return;
    setAnchorEl(null);
  };

  return (
    <header className="w-full py-4 flex justify-center">
      <nav className="w-full max-w-[1200px] flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Webshop</h2>
        <div className="flex gap-4">
          <div className="flex gap-4 items-center">
            <IconContext.Provider value={{ color: "black", size: "24px" }}>
              <span className="flex items-center gap-1">
                <Avatar
                  alt="Avatar"
                  src="http://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
                />
                John Doe
              </span>
              <AiOutlineHeart />
              <div className="border-red-600 border">
                <IconButton
                  onMouseEnter={handleOpenMenu}
                  onClick={() => navigate("cart")}
                >
                  <Badge
                    badgeContent={shoppingCartCtx.renderCart.totalAmount}
                    color="primary"
                  >
                    <MdShoppingCart />
                  </Badge>
                </IconButton>
                <PreviewCart isOpen={open} anchorEl={anchorEl} handleCloseMenu={handleCloseMenu}/>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
