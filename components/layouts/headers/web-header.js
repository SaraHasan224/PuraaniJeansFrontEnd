import React, { Fragment,  } from "react";
import { useSelector } from "react-redux";

import { Media, Container, Row, Col } from "reactstrap";
import Link from "next/link";
import ALink from "../../../features/alink";


const WebHeader = () => {
  const { banners, homeContent } = useSelector((state) => state.metadata);


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
            <h2 className="title-inner4">{homeContent?.title}</h2>
            <h4 className="title-inner4">{homeContent?.sub_title}</h4>
          </div>
        </Row>
        <Container fluid={true} className="lookbook-section pt-0 lookbook mt-4">
          <Row>
            <Col md={3} sm={3}>
              <Row className="lookbook-img">
                <Banners bannerItem={caraouselBanner.slice(0, 1)} keyIndex={1}/>
                <Banners bannerItem={caraouselBanner.slice(1, 2)} keyIndex={2} />
              </Row>
            </Col>
            <Col md={6} sm={6}>
              <Row className="lookbook-img">
                <Banners bannerItem={mainBanner} keyIndex={3}/>
              </Row>
            </Col>
            <Col md={3} sm={3}>
              <Row className="lookbook-img">
                <Banners bannerItem={caraouselBanner.slice(2, 3)} keyIndex={4}/>
                <Banners bannerItem={caraouselBanner.slice(3, 4)} keyIndex={5}/>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

const Banners = (props) => {
  const { bannerItem, keyIndex } = props;
  return (
    <Col sm="12" className="lookbook-parent" key={`lookbook-parent-${bannerItem[0]?.index}`}>
      <div className="lookbook-block">
        <Media
          src={bannerItem[0]?.image}
          alt={bannerItem[0]?.text}
          className="img-fluid blur-up lazyload"
        />
        <div className={`lookbook-img-section img-${keyIndex}`}>
          <h2>{bannerItem[0]?.text}</h2>
          <ALink href={`/category/${bannerItem[0]?.slug}`}>
            <a className={`btn btn-outline`}>
              Shop Now
            </a>
          </ALink>
        </div>
      </div>
    </Col>
  );
}


export default WebHeader;
