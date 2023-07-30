import React from 'react';

import {
    Form,
    Row,
    Col,
    Card,
    CardBody,
    Input,
    TabPane,
} from "reactstrap";

const SettingsTab = ({ active, setActive }) => {
    return (
        <TabPane tabId="5">
            <Row>
                <Col sm="12">
                    <Card className="mt-0">
                        <CardBody>
                            <div className="dashboard-box">
                                <div className="dashboard-title">
                                    <h4>settings</h4>
                                </div>
                                <div className="dashboard-detail">
                                    <div className="account-setting">
                                        <h5>Change Name</h5>
                                        <Row>
                                            <Col>
                                                <Form>
                                                    <Row>
                                                        <Col sm="6">
                                                            <Input type="text" className="form-control"
                                                                placeholder="Enter your shop name" />
                                                        </Col>
                                                    </Row>
                                                    <a href={`/closet/dashboard`} className="btn btn-solid btn-green btn-sm">
                                                        Save
                                                    </a>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    );

}

export default SettingsTab;