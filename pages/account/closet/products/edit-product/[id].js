import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonLayout from '../../../../../components/layouts/common-layout';
import withPrivateRoute from '../../../../../hoc/auth/withPrivateRoute';

import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { HELPER } from '../../../../../utils';
import ProductStepper from './common/stepper';
import { PRODUCT_ACTIONS } from '../../../../../store/actions';
import { useRouter } from 'next/router';
import { PRODUCTS_CONSTANTS } from '../../../../../store/actionTypes';



const EditClosetProducts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;

  const { closet } = useSelector((state) => state.closet);
  
  useEffect(() => {
    dispatch({type: PRODUCTS_CONSTANTS.PRODUCT_DATA_RESET});
    dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT_META());
    dispatch(PRODUCT_ACTIONS.GET_PRODUCT_DETAIL(id, "edit"));
  }, []);


  return (
    <CommonLayout parent="home" title={HELPER.isNotEmpty(closet?.name) ? closet?.name : `Closet dashboard`} showBreadcrumb={true}>
      <section className="dashboard-section section-b-space full-banner parallax parallax-home noBtmPadding noTopPadding">
        <div className='pt-3 pb-3'>
          <Container className='dashboard-product-section'>
            <Row>
              <Col className="collection-content">
                <div className="page-main-content">
                  <div className="top-banner-wrapper">
                    <div className="top-banner-content small-section pb-0">
                      <h4>List an item</h4>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className=''>
              <Col className="collection-content">
                <div className="page-main-content">
                  <div className="top-banner-wrapper">
                    <ProductStepper />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </CommonLayout>
  )
}

export default EditClosetProducts;
// export default withPrivateRoute(EditClosetProducts);