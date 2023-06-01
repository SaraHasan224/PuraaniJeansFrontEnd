import React from "react";
import { Media } from "reactstrap";
import ALink from "../../features/alink";

const ServiceContent = ({
  link,
  title,
  service,
  lastChild,
  price,
  titleLink
}) => {
  return (
    <div
      className={`media ${lastChild ? "border-0 m-0" : ""}`}
    >
      <Media
        src={link}
        alt=""
        className="img-fluid blur-up lazyload mr-3"
      />
      <div className="media-body">
        <h4>
          <ALink href={titleLink}>
            {title}
          </ALink>
        </h4>
        <p>{service}</p>
        <div className="price">{price}</div>
      </div>
    </div>
  );
};

export default ServiceContent;
