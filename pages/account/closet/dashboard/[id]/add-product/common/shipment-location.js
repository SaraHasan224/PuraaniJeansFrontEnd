import React, { useImperativeHandle, useState, forwardRef } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Autocomplete, FormHelperText } from '@mui/joy';
import {
    Switch,
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Checkbox,
} from '@mui/material';

const ShipmentLocation = forwardRef((props, ref) => {
    const [checked, setChecked] = useState(true);
    const [worldWideShipping, setWorldWideShipping] = React.useState(true);

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

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleChangeWorldWideShipping = (event) => {
        setWorldWideShipping(event.target.checked);
    };

    return (
        <Container className='dashboard-product-section'>
            <Row>
                <Col className="collection-content">
                    <div className="page-main-content">
                        <div className="top-banner-wrapper">
                            <div className="top-banner-content small-section pb-0">
                                <h4>Shipment & Location</h4>
                                <div className="">
                                    <Row className='mt-4'>
                                        <Col lg="12" md="12" sm="12" xs="12">
                                            <FormLabel>
                                                <h6><b>Location</b></h6>
                                            </FormLabel>
                                            <Autocomplete
                                                size="md"
                                                startDecorator={<AddLocationAltIcon />}
                                                placeholder="Choose Location"
                                                options={['Canada', 'USA']}
                                            />
                                            <FormHelperText>Select your country from the dropdown list.</FormHelperText>
                                        </Col>
                                    </Row>
                                    <FormLabel className="mt-4">
                                        <h4>Shipment</h4>
                                    </FormLabel>
                                    <Row className='mt-4 ml-1 mr-1'>
                                        <Col lg="12" md="12" sm="12" xs="12" className='shipment-section pt-4'>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="top"
                                                    control={<Switch
                                                        checked={checked}
                                                        onChange={handleChange}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                        color="default"
                                                    />}
                                                    label="Offer free shipping"
                                                    labelPlacement="left"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="12" md="12" sm="12" xs="12" className='shipment-section pt-4'>
                                            <Autocomplete
                                                startDecorator={<AddLocationAltIcon />}
                                                placeholder="Choose Location"
                                                options={['Canada', 'USA']}
                                            />
                                            <FormHelperText>Select your country from the dropdown list.</FormHelperText>
                                        </Col>
                                        <Col lg="12" md="12" sm="12" xs="12" className='shipment-section pt-4'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={worldWideShipping}
                                                        onChange={handleChangeWorldWideShipping}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                        color="default"
                                                    />
                                                }
                                                label="Offer worldwide Shipping"
                                            />
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

export default ShipmentLocation;