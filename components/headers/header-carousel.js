import React, { Fragment, useEffect, useState } from "react";
import { Media, Container, Row, Col } from "reactstrap";
import Link from "next/link";

import Collection from "./mobile-header";
import HomeSlider from "./mobile-slider";

const HeaderCarousel = ({ banners }) => {
  
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
    windowWidth > 600 ? <WebHeader banners={banners}/> : <MobileHeader banners={banners}/>
  );
};

const WebHeader = ({ banners }) => {
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
      
            {
              banners.map((banner, i) => {
                console.log("banner: ", banner)
                return (
                  <Col md={banner?.is_centered ? 6 : 3} sm={banner?.is_centered ? 6 : 3}>
                    <Row className="lookbook-img">
                      {
                        banner.items.map((bannerItem, j) => {
                          return(
                            <Col sm="12" className="lookbook-parent" key={j}>
                              <div className="lookbook-block">
                                <Media
                                  src={bannerItem?.image}
                                  alt={bannerItem?.text}
                                  className="img-fluid blur-up lazyload"
                                />
                                <div className={`lookbook-img-section img-${j+i+1}`}>
                                  <h2>{bannerItem?.text}</h2>
                                  <Link href={"#"}>
                                    <a className={`btn btn-outline`}>
                                      Shop Now
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </Col>
                          )
                        })
                      }
                    </Row>
                  </Col>
                );
              })
            }
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

const MobileHeader = () => {
  return (
    <>
      <HomeSlider />
      <Collection first />
      <Collection />
    </>
  )
}
export default HeaderCarousel;
