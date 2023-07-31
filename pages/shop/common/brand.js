import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { useSelector } from "react-redux";


const Brand = () => {
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);

  const { filters } = useSelector((state) => state.category);
  var { brands } = filters

  var loading = '';
  var data = '';
  // var { loading, data } = useQuery(GET_BRAND, {
  //   variables: {
  //     type: context.state,
  //   },
  // });

  return (
    <div className="collection-collapse-block open">
      <h3 className="collapse-block-title" onClick={toggleBrand}>
        brand
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-brand-filter">
            {loading
              ? "loading"
              : brands && brands.map((brand, index) => (
                  <div
                    className="form-check custom-checkbox collection-filter-checkbox"
                    key={index}
                  >
                    <Input
                      checked={context.selectedBrands.includes(brand)}
                      onChange={() => {
                        context.handleBrands(brand, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={brand}
                    />
                    <label className="custom-control-label" htmlFor={brand}>
                      {brand?.name}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Brand;
