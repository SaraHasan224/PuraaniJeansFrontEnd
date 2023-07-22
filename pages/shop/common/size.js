import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Collapse, Input } from "reactstrap";
import FilterContext from "../../../context/filter/FilterContext";
import { HELPER } from "../../../utils";
import { useSelector } from "react-redux";

const GET_SIZE = gql`
  query getSize($type: String) {
    getSize(type: $type) {
      size
    }
  }
`;

const Size = () => {
  const { filters } = useSelector((state) => state.products);
  var { size } = filters

  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(FilterContext);
  const isChecked = context.isChecked;
  const filterChecked = context.filterChecked;
  const toggle = () => setIsOpen(!isOpen);

  // var { loading, data } = useQuery(GET_SIZE, {
  //   variables: {
  //     type: context.state,
  //   },
  // });

  var loading = '';
  var data = '';

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title" onClick={toggle}>
        size
      </h3>
      <Collapse isOpen={isOpen}>
        <div className="collection-collapse-block-content">
          <div className="collection-size-filter">
            {HELPER.isNotEmpty(size) && Object.keys(size).map((val, index) => (
                  <div key={index}
                    className="form-check custom-checkbox collection-filter-checkbox"
                  >
                    <Input
                      checked={context.selectedSize.includes(size[val])}
                      onChange={() => {
                        context.handleSizes(size[val], isChecked);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id={size[val]}
                    />

                    <label className="custom-control-label" htmlFor={size[val]}>
                      {size[val]}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Size;
