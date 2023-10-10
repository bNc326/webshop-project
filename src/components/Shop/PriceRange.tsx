import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { ShopContext, SortType } from "../../context/Shop";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
interface Props {
  sectionName: string;
  priceRange: number[];
  sortType: SortType;
}

const PriceRange: React.FC<Props> = ({ sectionName, priceRange, sortType }) => {
  const shopCtx = useContext(ShopContext);
  const [value, setValue] = React.useState<number[]>([
    priceRange[0],
    priceRange[1],
  ]);

  useEffect(() => {
    if (shopCtx.sortByPrice.length > 0) {
      setValue(shopCtx.sortByPrice);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeInput = (e: React.ChangeEvent, index: 0 | 1) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    let inputValue = Number(e.target.value) as number;
    if (inputValue === 0) {
      inputValue = priceRange[0];
    }

    if (inputValue > priceRange[1]) {
      inputValue = priceRange[1];
    }
    const updateValue = [...value];
    updateValue[index] = inputValue;
    setValue(updateValue);
  };

  const handleSort = () => {
    shopCtx.handleSort({ type: sortType, value });
  };

  const resetRange = () => {
    setValue([priceRange[0], priceRange[1]]);
    shopCtx.handleSort({
      type: sortType,
      value: [priceRange[0], priceRange[1]],
    });
  };

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  function valueLabelFormat(value: number) {
    return formatPrice.format(value);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{sectionName}</h3>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-4/5 laptop:w-full flex flex-col gap-4">
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
            onChangeCommitted={handleSort}
            min={priceRange[0]}
            max={priceRange[1]}
          />
          <div className="flex justify-between gap-2">
            <TextField
              variant="outlined"
              fullWidth
              size={"small"}
              value={value[0]}
              onChange={(e: ChangeEvent) => handleChangeInput(e, 0)}
              onBlur={handleSort}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className="font-semibold">$</span>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              fullWidth
              size={"small"}
              value={value[1]}
              onChange={(e: ChangeEvent) => handleChangeInput(e, 1)}
              onBlur={handleSort}
              inputProps={{
                step: 10,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span className="font-semibold">$</span>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {priceRange[0] !== value[0] || priceRange[1] !== value[1] ? (
            <Button variant="contained" onClick={resetRange}>
              <span className="font-semibold">Reset price</span>
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
