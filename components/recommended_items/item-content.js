import React from "react";

import { Media } from "reactstrap";
import parse  from 'html-react-parser'

import ALink from "../../features/alink";

const ItemContent = ({ item }) => {
  return (
    <div
      className={`media `}
    >
      <div className="media-image">
        <Media
          src={item?.image}
          alt={item?.name}
          className="img-fluid blur-up lazyload mr-3"
        />
      </div>
      <div className="media-body">
        <h4>
          <ALink href={item?.handle}>
            {item?.name}
          </ALink>
        </h4>
        <p>{parse(item?.short_description)}</p>
        <div className="price">{item?.price}</div>
      </div>
    </div>
  );
};

export default ItemContent;
