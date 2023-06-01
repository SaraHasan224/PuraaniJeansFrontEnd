import React from "react";
import Link from "next/link";
import { Media, Col, Container, Row } from "reactstrap";


const HomeSlider = () => {
  return (
    <section className="p-0">
      <div className="slide-1 home-slider">
        <MasterBanner
          img={"/my-assets/images/backgrounds/main-banner/3.png"}
          link={"#"}
          title={"welcome to fashion"}
          desc={"Top collection"}
        />
      </div>
    </section>
  );
};


const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      {/* <div className={`home ${classes ? classes : "text-center"}`}> */}
      <div
        className={`home ${classes ? classes : "text-center"}`}
        style={{ backgroundImage: "url(" + img + ")" }}
      >
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4>{title}</h4>
                  <h1>{desc}</h1>
                  <Link href={link}>
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "Shop Now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomeSlider;
