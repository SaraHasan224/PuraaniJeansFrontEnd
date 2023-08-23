import React, { useState, useContext } from "react";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { HELPER } from "../../../utils";
import { useSelector } from "react-redux";

const Condition = () => {
  const { condition } = useSelector((state) => state.products);

  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const {isChecked, selectedCondition, handleCondition } = context;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        condition
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-condition-filter">
            {HELPER.isNotEmpty(condition) && Object.keys(condition).map((val, key) => {
              return(
                <div key={`sizechart-${key}`}
                  className="form-check custom-checkbox collection-filter-checkbox"
                >
                  <Input
                    checked={HELPER.isNotEmpty(selectedCondition) ? selectedCondition.includes(condition[val]?.value) : false}
                    onChange={() => {
                      handleCondition(condition[val]?.value, isChecked);
                    }}
                    type="checkbox"
                    className="custom-control-input"
                    id={condition[val]?.option_id}
                  />

                  <label className="custom-control-label" htmlFor={`condition-`.key}>
                    {condition[val].label}
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

export default Condition;
