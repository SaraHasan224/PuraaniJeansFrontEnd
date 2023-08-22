import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { useSelector } from "react-redux";
import { HELPER } from "../../../utils";

const Category = () => {
  const { categories } = useSelector((state) => state.products);


  const context = useContext(FilterContext);
  const {
    setSubCategorySlug,
    setCategorySlug,
    setParentCategoryTitle,
    setSubCategoryTitle
  } = context;

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const toggleSubCategory = () => setIsSubCategoryOpen(!isSubCategoryOpen);
  const [isSubChildCategoryOpen, setIsSubChildCategoryOpen] = useState(false);
  const toggleSubChildCategory = () => setIsSubChildCategoryOpen(!isSubChildCategoryOpen);

  const updateCategory = (category) => {
    setParentCategoryTitle(category?.label);
    setCategorySlug(category?.value);
    setSubCategoryTitle(null);
    setSubCategorySlug(null);
  };

  const updateSubCategory = (category, subCategory) => {
    setParentCategoryTitle(category?.label);
    setCategorySlug(category?.value);
    setSubCategoryTitle(subCategory?.label);
    setSubCategorySlug(subCategory?.value);
  };

  const updateSubChildCategory = (category, subCategory, subChildCategory) => {
    // setCategorySlug(category?.value);
    // setSubCategorySlug(subCategory?.value);
    // setSubChildCategorySlug(subChildCategory?.value);
  };

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Category
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                <li className="option">
                  <a href={null} onClick={() => updateCategory({label: "All Products", value: "all"})} className="ptCatFilOpt">
                    All products
                  </a>
                </li>
                {
                  HELPER.isNotEmpty(categories) && categories.map((category, i) => {
                    return(
                      <>
                        <li key={`category-` + i} className="option">
                          <a href={null} onClick={() => updateCategory(category)} className="ptCatFilOpt">
                            {category?.label}
                          </a>
                          {HELPER.isNotEmpty(category.children) ?
                            <div className="optionAction">
                              <i className="fa fa-chevron-down text-right" aria-hidden="true" onClick={toggleSubCategory}></i>
                            </div> : ""}
                        </li>
                      <div className="ml-3">
                          {HELPER.isNotEmpty(category.children) ?
                            <Collapse isOpen={isSubCategoryOpen}>
                              <div className="collection-collapse-block-content">
                                  {category.children?.map((subCategory, k) => (
                                    <>
                                      <li>
                                        <a href={null} onClick={() => updateSubCategory(category, subCategory)} className="chCatFilOpt">
                                          {subCategory?.label}
                                        </a>
                                        {HELPER.isNotEmpty(subCategory.children) ?
                                          <div className="subOptionAction">
                                            <i className="fa fa-chevron-down text-right" aria-hidden="true" onClick={toggleSubChildCategory}></i>
                                          </div> : ""}
                                      </li>
                                      <Collapse isOpen={isSubChildCategoryOpen}>
                                        <div className="collection-collapse-block-content ml-6">
                                          {HELPER.isNotEmpty(subCategory.children) ?
                                            subCategory.children?.map((subChildCategory, k) => (
                                              <h6 href={null} onClick={() => updateSubChildCategory(category, subCategory, subChildCategory)}>
                                                {subChildCategory?.label}
                                              </h6>
                                            ))
                                            : ""}
                                        </div>
                                      </Collapse>
                                    </>
                                  ))}
                              </div>
                            </Collapse>
                            : ""}
                      </div>
                      </>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
