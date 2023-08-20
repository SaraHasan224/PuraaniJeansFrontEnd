import React from "react";
import { useSelector } from 'react-redux'
import Helmet from "react-helmet";

import { Row, Col } from 'reactstrap';
import Slider from "react-slick";
// import InternetConnection from "../../features/internet-connection";


const AuthBanner = ({ img, classes }) => {
  return (
    <div>
      <div className={`home auth ${classes ? classes : "text-center"}`}>
        <img src={img} alt="" className="img-fluid blur-up lazyload media" />
      </div>
    </div>
  );
};

const AuthLayout = ({ children}) => {
  const { meta, authBanners } = useSelector((state) => state.metadata);

  return (
    <>
      {/*
  <InternetConnection /> */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={meta?.favicon} />
        <title>
          {meta?.app_title}
        </title>
      </Helmet>
      {/* HEADER */}
      <section className="login-page section-b-space border-bottom-0 noTopPadding noBtmPadding">
        <Row>
          <Col lg="5" className="right-login noMargin noPadding">
            <Slider className="slide-1 home-slider">
              {authBanners.map((data, index) => {
                return (
                  <AuthBanner
                    key={index}
                    img={data.image}
                    classes={"p-center text-center"}
                  />
                );
              })}
            </Slider>
          </Col>
          <Col lg="7" className="noMargin noPadding">
            <div className="auth-banner parallax parallax-home noBtmPadding noTopPadding">
              {children}
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default AuthLayout;