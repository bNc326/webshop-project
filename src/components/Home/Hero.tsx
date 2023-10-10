import React from "react";
import { MdShoppingCart } from "react-icons/md";
import Button from "@mui/material/Button";
const Hero = () => {
  return (
    <div className="w-full flex justify-center bg-gray-200">
      <div className="w-full max-w-[1200px] flex flex-col mobile:flex-row gap-4 items-center p-4">
        <div className="w-full flex flex-col  gap-2">
          <h1 className="text-dynamicTitle">Rain Jacket Women</h1>
          <p className="text-dynamicList text-gray-500">
            Lightweight perfet for trip or casual wear---Long sleeve with
            hooded, adjustable drawstring waist design. Button and zipper front
            closure raincoat, fully stripes Lined and The Raincoat has 2 side
            pockets are a good size to hold all kinds of things, it covers the
            hips, and the hood is generous but doesn't overdo it.Attached Cotton
            Lined Hood with Adjustable Drawstrings give it a real styled look.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="outlined">
              <span className="text-dynamicList">View product</span>
            </Button>
            <Button variant="contained" endIcon={<MdShoppingCart size={20} />}>
              <span className="text-dynamicList">
                Shop <span className="font-semibold"> Now</span>
              </span>
            </Button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <img
            src="https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
            alt="Hero"
            title="Hero"
            className="block  max-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
