import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { useSelector } from "react-redux";
import { HELPER } from "../../../utils";


const Brand = () => {
  const context = useContext(FilterContext);
  const {isChecked, selectedBrands, handleBrands } = context;

  const [isOpen, setIsOpen] = useState(false);
  const toggleBrand = () => setIsOpen(!isOpen);

  const { brands } = useSelector((state) => state.products);

  var loading = '';
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
                      checked={HELPER.isNotEmpty(selectedBrands) && selectedBrands.includes(brand?.value) ? true : false}
                      onChange={() => {
                        handleBrands(brand?.value, isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={brand?.value}
                    />
                    <label className="custom-control-label" htmlFor={brand}>
                      {brand?.label}
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
