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
  console.log("router query: ", router.query)
  const [categoryTitle, setCategoryTitle] = useState("Shop");
  const [categorySlug, setCategorySlug] = useState('');
  const [parentCategoryTitle, setParentCategoryTitle] = useState("Home");  
  const [subCategoryTitle, setSubCategoryTitle] = useState("");  
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState({
    min: 0,
    max: 500,
  });
  const [isChecked, setIsChecked] = useState(true);
  const [filterChecked, setFilterChecked] = useState([{}]);

  useEffect(() => {
    console.log("0")
    setParentCategoryTitle(parentTitle)
    setSubCategoryTitle(subTitle)
    setCategoryTitle(title)
    setCategorySlug(slug)
    setSelectedBrands(brandParam ? brandParam : [])
    setSelectedColor(color ? color : "")
    setSelectedSize(sizeParam ? sizeParam : [])
    setSelectedPrice({
      min: min ? min : 0,
      max: min ? min : 500,
    })

    // if(HELPER.isNotEmpty(menu) && menu.title !== router.query.title && HELPER.isEmpty(router.query.title)) {
    //   console.log("1")
    //   router.push({
    //     pathname: "shop",
    //     query: {
    //       title: menu.title,
    //       parent: menu.parent_title,
    //       child: menu.child_title,
    //       slug: menu.path,
    //       brand: menu.brand,
    //       color: menu.color,
    //       size: menu.size,
    //       minPrice: menu.minPrice,
    //       maxPrice: menu.maxPrice,
    //     },
    //   })
    // }
    
  }, []);


  useEffect(() => {
    if(HELPER.isNotEmpty(router.query.title)) {
      console.log("5")
      setParentCategoryTitle(parentTitle)
      setSubCategoryTitle(subTitle)
      setCategoryTitle(title)
      setCategorySlug(slug)
      setSelectedBrands(brandParam ? brandParam : [])
      setSelectedColor(color ? color : "")
      setSelectedSize(sizeParam ? sizeParam : [])
      setSelectedPrice({
        min: min ? min : 0,
        max: min ? min : 500,
      })

    }
  }, [router.query]);

  // useEffect(() => {
  //   if(HELPER.isNotEmpty(menu) && menu.title !== router.query.title && HELPER.isEmpty(router.query.title)) {
  //     console.log("1")
  //     router.push({
  //       pathname: "shop",
  //       query: {
  //         title: menu.title,
  //         parent: menu.parent_title,
  //         child: menu.child_title,
  //         slug: menu.path,
  //         brand: menu.brand,
  //         color: menu.color,
  //         size: menu.size,
  //         minPrice: menu.minPrice,
  //         maxPrice: menu.maxPrice,
  //       },
  //     })
  //     // undefined, { shallow: true }
  //   }
  // }, [menu]);

  
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
