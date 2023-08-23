import React , { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Media, Col } from "reactstrap";
import { HOMEPAGE_ACTIONS } from "../../store/actions";
import { HELPER } from "../../utils";

const Brands = ({ designClass }) => {
  const { brands } = useSelector((state) => state.home);

  return (
    HELPER.isEmpty(brands) ? "" : <section className={designClass}>
      <Container>
        <Row>
              {brands.map((imgSrc, i) => {
                return (
                  <Col md="4" sm="6" key={i}>
                    <div className="logo-block">
                      <a href={null}>
                        <Media src={imgSrc?.icon} alt={imgSrc?.index} />
                      </a>
                    </div>
                  </Col>
                );
              })}
        </Row>
      </Container>
    </section>
  );
};

export default Brands;
