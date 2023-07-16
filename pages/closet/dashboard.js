import React, { useState } from 'react';
import CommonLayout from '../../components/layouts/common-layout';

import withPrivateRoute from '../../hoc/private_routes/withPrivateRoute';

import {
  Container,
  Row,
  Col,
  TabContent
} from "reactstrap";
import DashboardNavigation from "./common/navigation";
import DashboardTab from "./common/dashboard";
import ProductsTab from "./common/products";
import OrdersTab from "./common/orders";
import SettingsTab from "./common/settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <CommonLayout parent="home" title="Closet dashboard">

      <section className="dashboard-section section-b-space">
        <Container>
          <Row>
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