import React, { useState, useContext } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { useSelector } from "react-redux";
import { HELPER } from "../../../utils";

const Category = () => {
  const { filters } = useSelector((state) => state.category);
  var { categories } = filters


  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();

  const updateCategory = (category) => {
    setSelectedCategory(category);
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
                <li>
                  <a href={null} onClick={() => updateCategory("all")}>
                    All products
                  </a>
                </li>
                {
                  HELPER.isNotEmpty(categories) && categories.map((category, i) => (
                    <li key={`category-`+i}>
                      <a href={null} onClick={() => updateCategory(category)}>
                        {category?.name}
                      </a>
                    </li>
                  ))
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
