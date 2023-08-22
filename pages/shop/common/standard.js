import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { HELPER } from "../../../utils";
import { useSelector } from "react-redux";

const Standard = () => {
  const { standard } = useSelector((state) => state.products);

  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const {isChecked, selectedStandard, handleStandard } = context;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
      standard
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-standard-filter">
            {HELPER.isNotEmpty(standard) && Object.keys(standard).map((val, key) => {
              return(
                <div key={`sizechart-${key}`}
                  className="form-check custom-checkbox collection-filter-checkbox"
                >
                  <Input
                    checked={HELPER.isNotEmpty(selectedStandard) ? selectedStandard.includes(standard[val]?.value) : false}
                    onChange={() => {
                      handleStandard(standard[val]?.value, isChecked);
                    }}
                    type="checkbox"
                    className="custom-control-input"
                    id={standard[val]?.option_id}
                  />

                  <label className="custom-control-label" htmlFor={`standard-`.key}>
                    {standard[val]?.label}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Standard;
