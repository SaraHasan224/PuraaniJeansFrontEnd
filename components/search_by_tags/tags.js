import React from "react";
import { Row, Col } from "reactstrap";

import ALink from "../../features/alink";


const tagTypes = [
  {
    link: "/shop?slug=new-products",
    tagName: "New Products"
  },
  {
    link: "/shop?slug=feature-products",
    tagName: "Feature Product"
  },
  {
    link: "/shop?slug=best-sellers",
    tagName: "Best Sellers"
  },
  {
    link: "/shop?slug=sale",
    tagName: "Sale"
  },
  {
    link: "/shop?slug=best",
    tagName: "Best"
  },
];

const SearchByTags = () => {
  return (
    <>
    <div className="title4 mt-3">
      <h2 className="title-inner4">Search by Tags</h2>
      <div className="line">
        <span></span>
      </div>
    </div>
    <div className="container category-button">
      <section className="section-b-space border-bottom-0 noTopPadding">
        <Row className="partition1">
          {tagTypes.map((tag, i) => (
            <Col key={i}>
                <ALink href={tag?.link} className="btn btn-outline d-block w-100">
                {tag?.tagName}
                </ALink>
            </Col>
          ))}
        </Row>
      </section>
    </div>
    </>
  );
};

export default SearchByTags;
