import { Input, TextField } from '@mui/joy';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";



const Price = forwardRef((props, ref)  => {
    const [price, setPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");

    useImperativeHandle(
        ref,
        () => ({
            handleNextAction() {
                alert("Child handleNext Function Called")
                dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT_DATA(CONSTANTS.PRODUCT_ADDED.PHOTO_AND_DESCRIPTION, {
                    images: files,
                    description: description
                }))
            },
            handleValidationAction() {
                let error = false;
                let errorDescription = "";
                if(HELPER.isEmpty(description)){
                    error = true;
                    errorDescription = "Product description is required."
                }
                if(HELPER.isEmpty(files)){
                    error = true;
                    errorDescription = "Product images are required."
                }
                return {
                    'error': error,
                    'description': errorDescription
                };
            },
            handleWizardCompleteAction() {
                return false;
            }
        }),
    )

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
});

export default Price;