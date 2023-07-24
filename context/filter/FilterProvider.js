import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import FilterContext from "./FilterContext";
import { MENU_ITEM_ACTIONS } from "../../store/actions";
import { HELPER } from "../../utils";

const FilterProvider = (props) => {
  const dispatch = useDispatch() 
  const router = useRouter();

  const title = router.query.title;
  const parentTitle = router.query.parent;
  const subTitle = router.query.child;
  const brand = router.query.brand;
  const color = router.query.color;
  const size = router.query.size;
  const slug = router.query.slug;
  const min = router.query.min;
  const max = router.query.max;
  let sizeParam = size ? size.split(",") : null;
  let brandParam = brand ? brand.split(",") : [];
  const [categoryTitle, setCategoryTitle] = useState(title ? title : "Shop");
  const [categorySlug, setCategorySlug] = useState(slug ? slug : "");
  const [parentCategoryTitle, setParentCategoryTitle] = useState(parentTitle ? parentTitle : "Home");  
  const [subCategoryTitle, setSubCategoryTitle] = useState(subTitle);  
  const [selectedBrands, setSelectedBrands] = useState(brandParam ? brandParam : []);
  const [selectedColor, setSelectedColor] = useState(color ? color : "");
  const [selectedSize, setSelectedSize] = useState(sizeParam ? sizeParam : []);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min ? min : 0,
    max: max ? max : '',
  });
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);

  const handleBrands = (brand, checked) => {
    var index = selectedBrands.indexOf(brand);

    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ brand, checked }]);
      setSelectedBrands(selectedBrands.filter((e) => e !== brand));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ brand, checked }]);
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleSizes = (size, checked) => {
    var index = selectedSize.indexOf(size);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize(selectedSize.filter((e) => e !== size));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ size, checked }]);
      setSelectedSize([...selectedSize, size]);
    }
  };

  

  return (
    <FilterContext.Provider
      value={{
        ...props,
        title: categoryTitle,
        state: categorySlug,
        slug: categorySlug,
        parentCategoryTitle: parentCategoryTitle,
        subCategoryTitle: subCategoryTitle,
        setSelectedColor,
        setCategorySlug,
        setCategoryTitle,
        setSubCategoryTitle,
        setParentCategoryTitle,
        setSelectedBrands,
        selectedBrands,
        selectedColor,
        selectedPrice,
        isChecked,
        filterChecked,
        selectedSize,
        setSelectedSize,
        setSelectedPrice,
        handleBrands: handleBrands,
        handleSizes: handleSizes,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
