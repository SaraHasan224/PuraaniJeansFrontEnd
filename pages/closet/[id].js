import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

import CommonLayout from '../../components/layouts/common-layout';
import { CLOSET_ACTIONS, HOMEPAGE_ACTIONS } from '../../store/actions';
import { Container, Row, Col, Link, Media } from 'reactstrap';
import Masonry from "react-masonry-css";
import ProductBox from "./modules/metro-product-box";

const Closet = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const id = router.query.id;
  const {  featuredProducts  } = useSelector((state) => state.home);

  useEffect(() => {
    // dispatch(CLOSET_ACTIONS.GET_CLOSET(id));
    dispatch(HOMEPAGE_ACTIONS.GET_FEATURED_ITEMS());
  }, []);
  

const data = [];
  return (
    <CommonLayout parent="Home" title="Closet" showBreadcrumb={true}>
      <Fragment>
        {/*collection banner*/}
        <section className="pb-0 pt-0 mt-5 mb-0">
          <Container fluid={true}>
            <div className="collection-wrapper">
              <Container>
                <Row>
                  <Col className="collection-content">
                    <div className="page-main-content">
                      <div className="top-banner-wrapper">
                        <a href={null}>
                          <Media src={"https://multikart-react-reactpixelstrap.vercel.app/_next/static/media/sub-banner1.5d5f9c6f.jpg"} className="img-fluid blur-up lazyload" alt="" />
                        </a>
                        <div className="top-banner-content small-section pb-0">
                          <h4>fashion</h4>
                          <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                            to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                      </div>
                      <div className="collection-product-wrapper">
                        <section className="portfolio-section portfolio-padding metro-section port-col">
                           <Container fluid={true}>
                            <Masonry
                              breakpointCols={4}
                              className="isotopeContainer row"
                              columnClassName={`isotopeSelector col-xl-2 col-lg-3 col-md-4 col-sm-6`}
                            >
                              {
                                featuredProducts.map((data, i) => {
                                return (
                                  data?.data
                                  .slice(0, 20)
                                  .map((product, index) => (
                                    <ProductBox
                                      product={product}
                                      addCart={() => cartContext.addToCart(product, quantity)}
                                      addWish={() => wishlistContext.addToWish(product)}
                                      addCompare={() => compareContext.addToCompare(product)}
                                      key={index}
                                    />
                                  )))
                                })
                              }
                            </Masonry>
                          </Container>
                        </section>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </section>
        {/*collection banner end*/}
      </Fragment>
    </CommonLayout>


  );
}


export default Closet;