import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Media, Container, Row, Col } from "reactstrap";
import Link from "next/link";

import MobileHeader from "./mobile-header";

const HeaderCarousel = () => {
  const { banners } = useSelector((state) => state.metadata);

  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize)
  })

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-deafult", "#ff4c3b");
  });
  

  function handleResize() {
    setWindowWidth(window.innerWidth)
  }

  return (
    banners ? ( 
      windowWidth > 600 ? <WebHeader banners={banners} /> : <MobileHeader banners={banners} />) 
    : <></>
  );
};

const WebHeader = ({ banners }) => {
  const mainBanner = banners.filter(function (banner, i) {
    return banner.is_centered == 1;
  })
  const caraouselBanner = banners.filter(function (banner, i) {
    return banner.is_centered != 1;
  })
  return (
    <div className="full-banner parallax parallax-home noBtmPadding noTopPadding">
      <Fragment>
        <Row>
          <div className="title4 mt-5">
            <h2 className="title-inner4">BUY. SELL.DO IT ALL OVER.</h2>
            <h4 className="title-inner4">Welcome to the community-powered circular fashion marketplace.</h4>
          </div>
        </Row>
        <Container fluid={true} className="lookbook-section pt-0 lookbook mt-4">
          <Row>
            <Col md={3} sm={3}>
              <Row className="lookbook-img">
                <Banners bannerItem={caraouselBanner.slice(0, 1)}/>
                <Banners bannerItem={caraouselBanner.slice(1, 2)}/>
              </Row>
            </Col>
            <Col md={6} sm={6}>
              <Row className="lookbook-img">
                <Banners bannerItem={mainBanner}/>
              </Row>
            </Col>
            <Col md={3} sm={3}>
              <Row className="lookbook-img">
                <Banners bannerItem={caraouselBanner.slice(2, 3)}/>
                <Banners bannerItem={caraouselBanner.slice(3, 4)}/>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

const Banners = ({ bannerItem }) => {
  return (
    <Col sm="12" className="lookbook-parent" key={`lookbook-parent-${bannerItem[0]?.index}`}>
      <div className="lookbook-block">
        <Media
          src={bannerItem[0]?.image}
          alt={bannerItem[0]?.text}
          className="img-fluid blur-up lazyload"
        />
        <div className={`lookbook-img-section img-${bannerItem[0]?.index}`}>
          <h2>{bannerItem[0]?.text}</h2>
          <Link href={"#"}>
            <a className={`btn btn-outline`}>
              Shop Now
            </a>
          </Link>
        </div>
      </div>
    </Col>
  );
}

export default HeaderCarousel;
