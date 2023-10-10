import { useState, useEffect, useContext, useMemo } from "react";
import ShopModel from "../../model/shop";
import Product from "../Shop/Product";
import Filter from "../Shop/Filter";
import { ShopContext } from "../../context/Shop";
import { Button } from "@mui/material";
import { MdFilterList } from "react-icons/md";
import Drawer from "@mui/material/Drawer";
import CircularProgress from "@mui/material/CircularProgress";
const Shop = () => {
  const shopCtx = useContext(ShopContext);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  return (
    <div className="w-full flex justify-center relative">
      <div className="w-full max-w-[1200px] flex flex-col laptop:flex-row  p-4 gap-4">
        <aside className="hidden w-1/5 laptop:flex justify-center">
          {!shopCtx.isLoading && (
            <Filter
              categories={shopCtx.allCategories}
              priceRange={shopCtx.priceRange}
            />
          )}
        </aside>
        <div className="laptop:hidden">
          <Button
            variant="contained"
            startIcon={<MdFilterList />}
            onClick={handleOpenFilter}
            fullWidth
          >
            Filter
          </Button>
        </div>
        <div className="laptop:hidden">
          <Drawer
            anchor="left"
            open={isFilterOpen}
            onClose={handleCloseFilter}
            PaperProps={{
              class: "bg-white w-11/12 h-full",
            }}
          >
            <div className="overflow-y-auto">
              {!shopCtx.isLoading && (
                <Filter
                  categories={shopCtx.allCategories}
                  priceRange={shopCtx.priceRange}
                />
              )}
            </div>
          </Drawer>
        </div>
        <article className="w-full laptop:w-4/5 flex justify-center">
          {!shopCtx.isLoading && <Product products={shopCtx.products} />}
          {!shopCtx.isLoading && shopCtx.isFilterLoading && (
            <div className="fixed w-full h-full flex items-center justify-center top-0 left-0 z-[10000]">
              <div className="bg-black/50 p-8 rounded-lg">
                <CircularProgress size={40} sx={{ color: "white" }} />
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Shop;
