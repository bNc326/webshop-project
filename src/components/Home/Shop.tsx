import { useState, useEffect, useContext, useMemo } from "react";
import ShopModel from "../../model/shop";
import Product from "../Shop/Product";
import Filter from "../Shop/Filter";
import { ShopContext } from "../../context/Shop";
import { ClipLoader } from "react-spinners";
const Shop = () => {
  const shopCtx = useContext(ShopContext);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] flex">
        <aside className="w-1/5 flex justify-center">
          {!shopCtx.isLoading && (
            <Filter
              categories={shopCtx.allCategories}
              priceRange={shopCtx.priceRange}
            />
          )}
        </aside>
        <article className="w-4/5 flex justify-center">
          {!shopCtx.isLoading && <Product products={shopCtx.products} />}
          {!shopCtx.isLoading && shopCtx.isFilterLoading && (
            <div className="fixed w-full h-full flex items-center justify-center top-0 left-0">
              <div className="bg-black/50 p-8 rounded-lg">
                <ClipLoader size={40} color="white" />
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Shop;
