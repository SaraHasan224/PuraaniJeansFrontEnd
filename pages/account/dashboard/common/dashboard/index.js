import React from 'react';

import {
    Row,
    Col,
    Card,
    CardBody,
    TabPane,
} from "reactstrap";
import TrendingProducts from './trendingProducts';
import RecentOrders from './recentOrders';

const DashboardTab = () => {
    return (
        <TabPane tabId="1">
            <Row>
                <Col lg="6">
                    <Card className="dashboard-table">
                        <CardBody>
                            <TrendingProducts/>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card className="dashboard-table">
                        <CardBody>
                            <RecentOrders/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    )
}


export default DashboardTab;