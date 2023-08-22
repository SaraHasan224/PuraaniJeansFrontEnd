import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import FilterContext from "./FilterContext";
import { CATEGORY_ACTIONS, MENU_ITEM_ACTIONS, PRODUCT_ACTIONS } from "../../store/actions";
import { HELPER } from "../../utils";

const FilterProvider = (props) => {
  const dispatch = useDispatch() 
  const router = useRouter();

  const { menu } = useSelector((state) => state.menu);

  const title = router.query.title;
  const parentTitle = router.query.parent;
  const subTitle = router.query.child;
  const brand = router.query.brand;
  const color = router.query.color;
  const standard = router.query.standard;
  const condition = router.query.condition;
  const size = router.query.size;
  const slug = router.query.slug;
  const min = router.query.min;
  const max = router.query.max;
  let sizeParam = HELPER.isNotEmpty(size) ? size.split(",") : [];
  let standardParam = HELPER.isNotEmpty(standard) ? standard.split(",") : [];
  let conditionParam = HELPER.isNotEmpty(condition) ? condition.split(",") : [];
  let brandParam = HELPER.isNotEmpty(brand) ? brand.split(",") : [];
  let colorParam = HELPER.isNotEmpty(color) ? color.split(",") : [];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(title ? title : "Shop");
  const [categorySlug, setCategorySlug] = useState(slug ? slug : "all");
  const [parentCategoryTitle, setParentCategoryTitle] = useState(parentTitle ? parentTitle : "Home");  
  const [subCategoryTitle, setSubCategoryTitle] = useState(subTitle);  
  const [subCategorySlug, setSubCategorySlug] = useState("");
  const [selectedBrands, setSelectedBrands] = useState(brandParam);
  const [selectedColor, setSelectedColor] = useState(colorParam);
  const [selectedSize, setSelectedSize] = useState(sizeParam);
  const [selectedStandard, setSelectedStandard] = useState(standardParam);
  const [selectedCondition, setSelectedCondition] = useState(conditionParam);
  const [selectedPrice, setSelectedPrice] = useState({
    min: min ? min : 0,
    max: max ? max : '',
  });
  const [sortBy, setSortBy] = useState("newest_arrival");
  const [perPageRecord, setPerPageRecord] = useState(10);
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
  const handleSelectedStandard = (standard, checked) => {
    var index = selectedStandard.indexOf(standard);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ standard, checked }]);
      setSelectedStandard(selectedStandard.filter((e) => e !== standard));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ standard, checked }]);
      setSelectedStandard([...selectedStandard, standard]);
    }
  };
  const handleSelectedCondition = (condition, checked) => {
    console.log("selected condition: ", condition, checked)
    var index = selectedCondition.indexOf(condition);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ condition, checked }]);
      setSelectedCondition(selectedCondition.filter((e) => e !== condition));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ condition, checked }]);
      setSelectedCondition([...selectedCondition, condition]);
    }
  };
  const handleSelectedColor = (color, checked) => {
    console.log("selected color: ", color, checked)
    var index = selectedColor.indexOf(color);
    if (index > -1) {
      setIsChecked(!isChecked);
      setFilterChecked([{ color, checked }]);
      setSelectedColor(selectedColor.filter((e) => e !== color));
    } else {
      setIsChecked(!isChecked);
      setFilterChecked([{ color, checked }]);
      setSelectedColor([...selectedColor, color]);
    }
  };

  useEffect(() => {
    if(HELPER.isNotEmpty(categorySlug)) {
      dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(categorySlug))
    }else if(HELPER.isEmpty(categoryTitle)) {
      dispatch(PRODUCT_ACTIONS.GET_ALL_PRODUCT_LIST())
    }
  }, []);

  useEffect(() => {
    if(HELPER.isNotEmpty(categorySlug)) {
      dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(categorySlug))
    }
  }, [categorySlug]);

  // useEffect(() => {
  //   if(HELPER.isNotEmpty(categorySlug)) {
  //     dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(categorySlug))
  //   }
  // }, [categorySlug]);

  useEffect(() => {
    if(HELPER.isNotEmpty(menu.title)) {
      setSelectedBrands(HELPER.isNotEmpty(menu.brands) ? menu.brands : "");
      setSelectedColor(HELPER.isNotEmpty(menu.color) ? menu.color : "");
      setSelectedPrice(HELPER.isNotEmpty(menu.price) ? menu.price : "");
      setCategorySlug(HELPER.isNotEmpty(menu.slug) ? menu.slug : "");
      setCategoryTitle(HELPER.isNotEmpty(menu.title) ? menu.title : "");
      setParentCategoryTitle(HELPER.isNotEmpty(menu.parent) ? menu.parent : "");
      setSubCategoryTitle(HELPER.isNotEmpty(menu.child) ? menu.child : "");
      setSelectedSize(HELPER.isNotEmpty(menu.size) ? menu.size : "");
    }
  }, [menu]);


  useEffect(() => {
    router.push(`/shop?slug=${categorySlug}&child=${subCategorySlug}&brand=${selectedBrands}&condition=${selectedCondition}&standard=${selectedStandard}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice?.min}&maxPrice=${selectedPrice?.max}`, undefined, { shallow: true });
  }, [
    categorySlug,
    subCategorySlug,
    selectedBrands,
    selectedColor,
    selectedCondition,
    selectedStandard,
    selectedSize,
    selectedPrice?.min,
    selectedPrice?.max
  ]);
  
  // 

  return (
    <FilterContext.Provider
      value={{
        ...props,
        title: categoryTitle,
        setCategoryTitle,
        state: categorySlug,
        slug: categorySlug,
        setCategorySlug,
        selectedCategories,
        setSelectedCategories,
        subCategorySlug,
        setSubCategorySlug,
        parentCategoryTitle: parentCategoryTitle,
        setParentCategoryTitle,
        subCategoryTitle: subCategoryTitle,
        setSubCategoryTitle,
        selectedColor,
        setSelectedColor,
        handleColor: handleSelectedColor,
        selectedBrands,
        setSelectedBrands,
        selectedPrice,
        setSelectedPrice,
        isChecked,
        filterChecked,
        selectedSize,
        setSelectedSize,
        selectedStandard,
        setSelectedStandard,
        selectedCondition,
        setSelectedCondition,
        sortBy,
        setSortBy,
        perPageRecord,
        setPerPageRecord,
        handleBrands: handleBrands,
        handleSizes: handleSizes,
        handleStandard: handleSelectedStandard,
        handleCondition: handleSelectedCondition
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
