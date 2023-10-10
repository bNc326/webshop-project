import React, { useContext } from "react";
import { ShopContext, SortBy, SortType } from "../../context/Shop";
interface Props {
  sectionName: string;
  items: string[];
  sortType: SortType;
}

const FilterSection: React.FC<Props> = ({ sectionName, items, sortType }) => {
  const shopCtx = useContext(ShopContext);
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{sectionName}</h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-lg cursor-pointer"
            onClick={() => shopCtx.handleSort({ type: sortType, value: item })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
