import React from "react";
import { useSelector } from "react-redux";

import { Col, Container, Media, Row } from "reactstrap";

import Link from "next/link";


const HomeSlider = () => {
  const { banners, homeContent } = useSelector((state) => state.metadata);

  const mainBanner = banners.filter(function (banner,i) {
      return banner.is_centered == 1;
  })

  const caraouselBanner = banners.filter(function (banner,i) {
      return banner.is_centered != 1;
  })

  
  return (
    <>
      <section className="p-0">
        <div className="slide-1 home-slider">
          <MasterBanner
            bannerItem={mainBanner[0]}
            title={homeContent?.title}
            desc={homeContent?.sub_title}
          />
        </div>
      </section>
      <section className="main-banner d-flex noPadding noMargin">
        <MobileCollectionBanner first bannerItem={caraouselBanner.slice(0, 2)} keyId={1}/>
        <MobileCollectionBanner  bannerItem={caraouselBanner.slice(2, 4)} keyId={2}/>
      </section>
    </>
  );
};


const MasterBanner = ({ title, desc, bannerItem }) => {
  return (
    <div
    >
      <div  className={`home master text-center gfg`}>
        <img src={bannerItem?.image} alt="" className="img-fluid blur-up lazyload media" />
        <div className="first-txt">
          <Container>
            <Row>
              <Col>
                <div className="slider-contain mobile-banner">
                  <div>
                    <h1>{title}</h1>
                    <h4>{desc}</h4>
                    <Link href={'#'}>
                      <a className={`btn btn-solid`}>
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div
        className={`home master text-center d-none`}
        style={{ backgroundImage: "url(" + bannerItem?.image + ")" }}
      >
        <div className="master-banner-mb-bg">
          <img src={bannerItem?.image} alt="" className="img-fluid blur-up lazyload media" />
        </div>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain mobile-banner">
                <div>
                  <h1>{title}</h1>
                  <h4>{desc}</h4>
                  <Link href={'#'}>
                    <a className={`btn btn-solid`}>
                    Shop Now
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

const Banner = ({ img, data, keyId }) => {
  return (
    <Col md="6 banner-text-white">
      <Link href={'#'}>
        <a>
          <div className={`collection-banner ban-${keyId}`}>
            <Media
              src={data?.image}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
            <div className="contain-banner">
              <div className="contain-banner-wrap">
                <h4>{data?.text}</h4>
                <Link href={"#"}>
                  <a className={`btn btn-outline`}>
                    Shop Now
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Col>
  );
};

const MobileCollectionBanner = ({ first, bannerItem, keyId }) => {
  return (
    <section className="banner-padding banner-mb ratio2_1">
      <Container fluid={true}>
        <Row className="partition3">
          {first
            ? bannerItem.map((data, i) => {
                return (
                    <Banner
                      key={i}
                      data={data}
                      keyId={i+keyId}
                  />
                );
              })
            : bannerItem.map((data, i) => {
                return (
                  <Banner
                    key={i}
                    data={data}
                    keyId={i+keyId+1}
                  />
                );
              })}
        </Row>
      </Container>
    </section>
  );
};

export default HomeSlider;
