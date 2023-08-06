import React from 'react';

import {
    Row,
    Col,
} from "reactstrap";

const NotFound = ({ errTitle, errDescription }) => {
    return (
        errTitle ? <Row>
            <Col xs="12">
                <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                        <img
                            src={`/assets/images/empty-search.jpg`}
                            className="img-fluid mb-4 mx-auto"
                            alt=""
                        />
                        <h3>
                            <strong>{errTitle}</strong>
                        </h3>
                        {errDescription ?? <h4> {errDescription} </h4>}
                    </div>
                </div>
            </Col>
        </Row> : ""
    )
}

export default NotFound;