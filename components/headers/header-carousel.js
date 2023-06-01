import React, { Fragment, useEffect, useState } from "react";
import { Media, Container, Row, Col } from "reactstrap";

import Collection from "./mobile-header";
import HomeSlider from "./mobile-slider";

const HeaderCarousel = () => {
  const [windowWidth, setWindowWidth] = useState("");
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleResize() {
      setWindowWidth(window.innerWidth)
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
  })


  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#ff4c3b");
  });
  return (
    windowWidth > 600 ? <WebHeader/> : <MobileHeader/>
  );
};

const WebHeader = () => { 
  return (
    <div className="full-banner parallax parallax-home noBtmPadding noTopPadding">
      <Fragment>
        <Container fluid={true} className="lookbook-section pt-0 lookbook">
          <Row>
            <Col md="3" sm="3">
              <Row className="lookbook-img">
                <Col sm="12">
                  <div className="lookbook-block">
                    <Media
                      src="/my-assets/images/backgrounds/main-banner/1.png"
                      alt=""
                      className="img-fluid blur-up lazyload"
                    />
                  </div>
                </Col>
                <Col sm="12">
                  <div className="lookbook-block">
                    {" "}
                    <Media
                      src="/my-assets/images/backgrounds/main-banner/2.png"
                      alt=""
                      className="img-fluid blur-up lazyload"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md="6" sm="6">
              <Row className="lookbook-img center-img">
                <Col sm="12">
                  <div className="lookbook-block central">
                    {" "}
                    <Media
                      src="/my-assets/images/backgrounds/main-banner/3.png"
                      alt=""
                      className="img-fluid blur-up lazyload"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md="3" sm="3">
              <Row className="lookbook-img">
                <Col sm="12">
                  <div className="lookbook-block">
                    <Media
                      src="/my-assets/images/backgrounds/main-banner/4.png"
                      alt=""
                      className="img-fluid blur-up lazyload"
                    />
                  </div>
                </Col>
                <Col sm="12">
                  <div className="lookbook-block">
                    <Media
                      src="/my-assets/images/backgrounds/main-banner/5.png"
                      alt=""
                      className="img-fluid blur-up lazyload"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

const MobileHeader = () => {
  return(
    <>
      <HomeSlider />
      <Collection first />
      <Collection />
    </>
  )
}
export default HeaderCarousel;
