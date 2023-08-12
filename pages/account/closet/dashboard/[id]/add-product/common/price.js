import { Input, TextField } from '@mui/joy';
import React, { useState } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";



const Price = () => {
    const [price, setPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");

    return (
        <Container className='dashboard-product-section'>
            <Row>
                <Col className="collection-content">
                    <div className="page-main-content">
                        <div className="top-banner-wrapper">
                            <div className="top-banner-content small-section pb-0">
                                <h4>Pricing Plan</h4>
                                <div >
                                    <Row className='mt-4'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <div className="account-setting">
                                                <h6><b>Price</b></h6>
                                                <Input 
                                                    name="Outlined"
                                                    value={price}
                                                    variant="outlined"
                                                    type="number"
                                                    placeholder="Enter price"
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <div className="account-setting">
                                                <h6><b>Discounted Price</b></h6>
                                                <Input 
                                                    name="Outlined"
                                                    value={discountedPrice}
                                                    variant="outlined"
                                                    type="number"
                                                    placeholder="Enter discounted price"
                                                    onChange={(e) => setDiscountedPrice(e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Price;