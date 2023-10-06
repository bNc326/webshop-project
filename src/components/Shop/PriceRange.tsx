import React, { ChangeEvent, useContext } from "react";
import Slider from "@mui/material/Slider";
import { ShopContext, SortType } from "../../context/Shop";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { TextInput as Asd } from "flowbite-react";
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

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    shopCtx.handleSort({ type: sortType, value: newValue });
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
    shopCtx.handleSort({ type: sortType, value: updateValue });
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{sectionName}</h3>
      <div className="w-full flex flex-col gap-4">
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
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
      </div>
    </div>
  );
};

export default PriceRange;
