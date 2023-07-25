import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';

import CommonLayout from '../../components/layouts/common-layout';
import { CLOSET_ACTIONS } from '../../store/actions';
import { Container, Row, Col, Link, Media } from 'reactstrap';
import CollectionBanner from './modules/banner';
import CategoryBanner from './modules/category_banner';
import ClosetCollection from './modules/products';

const Closet = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    dispatch(CLOSET_ACTIONS.GET_CLOSET(id));
  }, []);

  return (
    <CommonLayout parent="Home" title="Closet" showBreadcrumb={true}>
      <Fragment>
        {/*collection banner*/}
        <section className="pb-0">
          <Container>
            <Row className="partition2">
              <CollectionBanner
                img={"https://multikart-react-reactpixelstrap.vercel.app/_next/static/media/sub-banner1.5d5f9c6f.jpg"}
                about={"women"}
                offer={"10% off"}
                classes={"p-right text-center"}
              />
            </Row>
            <CategoryBanner />
          </Container>
          <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <ClosetCollection type="metro" col="full" />
                    </Col>
                </Row>
            </Container>
        </section>
        {/*collection banner end*/}
      </Fragment>
    </CommonLayout>
  );
}


export default Closet;