import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

import Slider from "react-slick";

import CommonLayout from '../../components/layouts/common-layout';
import { CATEGORY_ACTIONS, CLOSET_ACTIONS } from '../../store/actions';
import { Container, Row, Col, Media } from 'reactstrap';
import Masonry from "react-masonry-css";
import ProductBox from "./modules/product-box";
import { HELPER } from '../../utils';
import cart from "../../public/assets/images/icon/cat1.png";
import cart2 from "../../public/assets/images/icon/cat2.png";
import cart3 from "../../public/assets/images/icon/cat3.png";
import cart4 from "../../public/assets/images/icon/cat4.png";
import cart5 from "../../public/assets/images/icon/cat5.png";
import cart6 from "../../public/assets/images/icon/cat6.png";
import categoryIcon from "../../public/my-assets/images/icons/category/icon.png"
import ALink from '../../features/alink';

const Product5 = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const Data = [
  { img: categoryIcon, title: "sport shoes", link: "#" },
  { img: cart2, title: "casual shoes", link: "#" },
  { img: cart3, title: "formal shoes", link: "#" },
  { img: cart4, title: "flat", link: "#" },
  { img: cart5, title: "heels", link: "#" },
  { img: cart6, title: "boots", link: "#" },
  { img: cart2, title: "casual shoes", link: "#" },
  { img: cart2, title: "casual shoes", link: "#" },
];

const Category = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const reference = router.query.id;
  const { category, categoryDataLoading, products, loading, parentCategory, subCategories } = useSelector((state) => state.category);
  const { data } = products

  useEffect(() => {
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_DETAILS(reference));
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(reference))
  }, []);

  useEffect(() => {
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_DETAILS(reference));
    dispatch(CATEGORY_ACTIONS.GET_CATEGORY_PRODUCT_ITEMS(reference))
  }, [reference]);

  return (
    <CommonLayout
      parent={HELPER.isNotEmpty(parentCategory?.name) ? parentCategory?.name : "Home"}
      title={HELPER.isNotEmpty(category?.name) ? category?.name : `Category`}
      showBreadcrumb={true}
    >
      <Fragment>
        {/*collection banner*/}
        <section className="pb-0 pt-0 mt-5 mb-0">
          <Container fluid={true}>
            {
              categoryDataLoading ? (
                "loading"
              ) : (
                <>
                  <div className="collection-wrapper">
                    <Container>
                      <Row>
                        <Col className="collection-content">
                          <div className="page-main-content">
                            <div className="top-banner-wrapper">
                              <a href={null}>
                                <Media src={category?.banner} className="img-fluid blur-up lazyload" alt="" />
                              </a>
                              <div className="top-banner-content small-section pb-0">

                                {HELPER.isNotEmpty(parentCategory?.name) ?
                                  <Col sm="6">
                                    <nav aria-label="breadcrumb" className="theme-breadcrumb">
                                      <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                          <ALink href={`/category/${parentCategory?.slug}`}>{parentCategory?.name}</ALink>
                                        </li>
                                        <li className="breadcrumb-item" aria-current="page">
                                          {category?.name}
                                        </li>
                                      </ol>
                                    </nav>
                                  </Col> : ``}

                                <h4>

                                  {HELPER.isNotEmpty(category?.name) ? category?.name : `Category`} Categories
                                </h4>
                                <section className="section-b-space border-section noTopPadding pb-3">
                                  <Row>
                                    <Col>
                                      <Row className="background slide-category">
                                        <Slider {...Product5} className="no-arrow">
                                          {subCategories.map((data, i) => {
                                            return (
                                              <Col key={i}>
                                                <ALink href={`/category/${data?.slug}`}>
                                                  <div className="contain-bg">
                                                    <a href={data.link}>
                                                      <div className={`category-image ${HELPER.isNotEmpty(data?.icon) ? "" : "bg-black"}`}>
                                                        <Media src={data.icon === "" ? categoryIcon : data?.icon} alt="" />
                                                      </div>
                                                    </a>
                                                    <h4 data-hover="size 06">{data.name}</h4>
                                                  </div>
                                                </ALink>
                                              </Col>
                                            );
                                          })}

                                          {/* {Data.map((data, i) => {
                                          return (
                                            <MasterCategory
                                              key={i}
                                              img={data.img.src}
                                              link={data.link}
                                              title={data.title}
                                            />
                                          );
                                        })} */}
                                        </Slider>
                                      </Row>
                                    </Col>
                                  </Row>
                                </section>
                              </div>
                            </div>
                            <div className="collection-product-wrapper">
                              <section className="portfolio-section portfolio-padding metro-section port-col">
                                {loading ? (
                                  <Container fluid={true}>
                                    <Row>
                                      <Col xs="12">
                                        <div>
                                          <div className="col-sm-12 empty-cart-cls text-center">
                                            {"loading"}
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </Container>
                                ) : <Container fluid={true}>
                                  {
                                    HELPER.isEmpty(data) ?
                                      <>
                                        <Row>
                                          <Col xs="12">
                                            <div>
                                              <div className="col-sm-12 empty-cart-cls text-center">
                                                <img
                                                  src={`/assets/images/empty-search.jpg`}
                                                  className="img-fluid mb-4 mx-auto"
                                                  alt=""
                                                />
                                                <h3>
                                                  <strong>No products found</strong>
                                                </h3>
                                                <h4>Explore more shortlist some items.</h4>
                                              </div>
                                            </div>
                                          </Col>

                                        </Row>
                                      </>
                                      : <Masonry breakpointCols={4} className="isotopeContainer row" columnClassName={`isotopeSelector
      col-xl-2 col-lg-3 col-md-4 col-sm-6`}>
                                        {data.map((product, index) => {
                                          return (<ProductBox product={product} addCart={() => cartContext.addToCart(product, quantity)}
                                            addWish={() => wishlistContext.addToWish(product)}
                                            addCompare={() => compareContext.addToCompare(product)}
                                            key={index}
                                          />)
                                        })
                                        }
                                      </Masonry>
                                  }
                                </Container>}


                              </section>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </>)}
          </Container>
        </section>
        {/*collection banner end*/}
      </Fragment>
    </CommonLayout>

  );
}

export default Category;