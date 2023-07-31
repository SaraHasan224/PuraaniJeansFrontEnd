import React from "react";
import { useSelector } from "react-redux";

import { Container, Row, Col } from "reactstrap";

import ItemContent from "./item-content";
import ALink from "../../features/alink";

import { HELPER } from "../../utils";


const RecommendItems = () => {
  const { recommended } = useSelector((state) => state.home);


  return (HELPER.isEmpty(recommended) ? "" :
    <Container className="home-services">
      <section className={"border-section noTopPadding"}>
        <Row className="d-flex services">
          <div className={`service-block first col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12`}>
            <div
              className={`media `}
            >
              <div className="media-body">
                <h4>
                  <ALink href={"#"}>
                  Recommend
                  </ALink>
                </h4>
                <p>Some Products that we picked for you</p>
              </div>
            </div>
          </div>
          {recommended.map((item, index) => {
            return (
              <div className={`service-block mid-section col-xl-2 col-lg-2 col-md-2 col-sm-4 col-xs-4`} key={`service-block-${index}`}>
                <ItemContent item={item} />
              </div>
            );
          })}
          <div className={`service-block last bg-dark text-white col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12`}>
            <div className={`media`}>
              <div className="media-body">
                <h4>
                  <ALink href={`/shop`}>View all</ALink>
                </h4>
                <div className="price">{"1000+ Products"}</div>
              </div>
            </div>
          </div>
        </Row>
      </section>
    </Container>
  );
};

export default RecommendItems;
