import React from "react";
import Link from "next/link";
import { Col, Container, Media, Row } from "reactstrap";


const HomeSlider = ({ banners }) => {
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
            title={"BUY. SELL.DO IT ALL OVER."}
            desc={"Welcome to the community-powered circular fashion marketplace."}
          />
        </div>
      </section>
      <MobileCollectionBanner first bannerItem={caraouselBanner.slice(0, 2)}/>
      <MobileCollectionBanner  bannerItem={caraouselBanner.slice(2, 4)}/>
    </>
  );
};


const MasterBanner = ({ title, desc, bannerItem }) => {
  return (
    <div>
      <div
        className={`home text-center`}
        style={{ backgroundImage: "url(" + bannerItem?.image + ")" }}
      >
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

const Banner = ({ img, data }) => {
  return (
    <Col md="6 banner-text-white">
      <Link href={'#'}>
        <a>
          <div className={`collection-banner`}>
            <Media
              src={data?.image}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
            <div className="contain-banner">
              <div>
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

const MobileCollectionBanner = ({ first, bannerItem }) => {
  return (
    <section className="banner-padding banner-furniture ratio2_1">
      <Container fluid={true}>
        <Row className="partition3">
          {first
            ? bannerItem.map((data, i) => {
                return (
                    <Banner
                      key={i}
                      data={data}
                  />
                );
              })
            : bannerItem.map((data, i) => {
                return (
                  <Banner
                    key={i}
                    data={data}
                  />
                );
              })}
        </Row>
      </Container>
    </section>
  );
};

export default HomeSlider;
