import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';


import CommonLayout from '../../../components/layouts/common-layout';
import withPrivateRoute from '../../../hoc/auth/withPrivateRoute';

import {
  Container,
  Row,
  Col,
  TabContent,
  Media
} from "reactstrap";
import DashboardNavigation from "./common/navigation";
import DashboardTab from "./common/dashboard/index";
import ProductsTab from "./common/products";
import OrdersTab from "./common/orders";
import SettingsTab from "./common/settings";
import { CLOSET_ACTIONS } from '../../../store/actions';
import { HELPER } from '../../../utils';
import Loader from '../../../features/loader';

const Dashboard = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const id = router.query.id;
  const {  closet  } = useSelector((state) => state.closet);
  
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    dispatch(CLOSET_ACTIONS.GET_CLOSET_DETAILS(id));
  }, []);

  return (
    HELPER.isEmpty(closet?.name) ? <Loader/> : <CommonLayout parent="home" title={HELPER.isNotEmpty(closet?.name) ? closet?.name : `Closet dashboard`} showBreadcrumb={true}>
      <section className="dashboard-section section-b-space">
        <Container>
          <Row>
            <Col className="collection-content">
              <div className="page-main-content">
                <div className="top-banner-wrapper">
                  <Media src={closet?.banner} className="img-fluid blur-up lazyload" alt="" />
                  <div className="top-banner-content small-section pb-0">
                    <h4>About {HELPER.isNotEmpty(closet?.name) ? closet?.name : `Closet`}</h4>
                    <p>{closet?.description}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col lg="3">
              <DashboardNavigation active={activeTab} setActive={setActiveTab} />
            </Col>
            <Col lg="9">
              <div className="faq-content">
                <TabContent activeTab={activeTab}>
                  <DashboardTab active={activeTab} setActive={setActiveTab} />
                  <ProductsTab active={activeTab} setActive={setActiveTab} />
                  <OrdersTab active={activeTab} setActive={setActiveTab} />
                  <SettingsTab active={activeTab} setActive={setActiveTab} />
                </TabContent>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  )
}

export default withPrivateRoute(Dashboard);