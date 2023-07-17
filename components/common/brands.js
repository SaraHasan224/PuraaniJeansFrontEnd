import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Media, Col } from "reactstrap";

const Brands = ({ designClass }) => {
  const { brands } = useSelector((state) => state.home);

  // const imgData = [
  //   "/my-assets/images/brands/1.png",
  //   "/my-assets/images/brands/2.png",
  //   "/my-assets/images/brands/3.png",
  //   "/my-assets/images/brands/4.png",
  //   "/my-assets/images/brands/5.png",
  //   "/my-assets/images/brands/6.png",
  // ];
  return (
    <section className={designClass}>
      <Container>
        <Row>
              {brands.map((imgSrc, i) => {
                return (
                  <Col md="4" key={i}>
                    <div className="logo-block">
                      <a href={null}>
                        <Media src={imgSrc} alt="" />
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
