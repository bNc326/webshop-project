import React, { useContext } from "react";
import FilterSection from "./FilterSection";
import PriceRange from "./PriceRange";
import { ShopContext, SortBy, SortType } from "../../context/Shop";

interface Props {
  categories: string[];
  priceRange: number[];
}

const sortByItems = [
  SortBy.DEFAULT,
  SortBy.RATE,
  SortBy.LOWTOHIGH,
  SortBy.HIGHTOLOW,
];

const Filter: React.FC<Props> = ({ categories, priceRange }) => {
  return (
    <div className="w-full p-4 flex flex-col gap-16">
      <PriceRange sectionName="Price Range in $" priceRange={priceRange} sortType={SortType.PRICE}/>
      <FilterSection
        sectionName="Categories"
        items={categories}
        sortType={SortType.CATEGORY}
      />
      <FilterSection sectionName="Sort By" items={sortByItems}
        sortType={SortType.SORT} />
    </div>
  );
};

export default Filter;
