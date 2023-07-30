import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

import CommonLayout from '../../components/layouts/common-layout';
import { CLOSET_ACTIONS } from '../../store/actions';
import { Container, Row, Col, Media } from 'reactstrap';
import Masonry from "react-masonry-css";
import ProductBox from "./modules/metro-product-box";
import { HELPER } from '../../utils';

const Closet = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const reference = router.query.id;
  const { closet, closetDataLoading, closetAllProductsData } = useSelector((state) => state.closet);

  useEffect(() => {
    dispatch(CLOSET_ACTIONS.GET_CLOSET_DETAILS(reference));
  }, []);

  const data = [];
  return (
    <CommonLayout parent="Home" title={HELPER.isNotEmpty(closet?.name) ? closet?.name : `Closet`} showBreadcrumb={true}>
      <Fragment>
        {/*collection banner*/}
        <section className="pb-0 pt-0 mt-5 mb-0">
          <Container fluid={true}>
            {
              closetDataLoading ? (
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
                                <Media src={closet?.banner} className="img-fluid blur-up lazyload" alt="" />
                              </a>
                              <div className="top-banner-content small-section pb-0">
                                <h4>About {HELPER.isNotEmpty(closet?.name) ? closet?.name : `Closet`}</h4>
                                <p>{closet?.about_closet}</p>
                              </div>
                            </div>
                            <div className="collection-product-wrapper">
                              <section className="portfolio-section portfolio-padding metro-section port-col">
                                <Container fluid={true}>
                                  <Masonry breakpointCols={4} className="isotopeContainer row" columnClassName={`isotopeSelector
                          col-xl-2 col-lg-3 col-md-4 col-sm-6`}>
                                    {
                                      closetAllProductsData.map((product, index) => {
                                        return (<ProductBox product={product} addCart={() => cartContext.addToCart(product, quantity)}
                                          addWish={() => wishlistContext.addToWish(product)}
                                          addCompare={() => compareContext.addToCompare(product)}
                                          key={index}
                                        />)
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
                </>)}
          </Container>
        </section>
        {/*collection banner end*/}
      </Fragment>
    </CommonLayout>

  );
}

export default Closet;