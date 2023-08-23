import React, { useImperativeHandle, useState, forwardRef, useEffect } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { Autocomplete, CircularProgress, FormHelperText, Input } from '@mui/joy';
import {
    Switch,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Checkbox,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { META_ACTIONS, PRODUCT_ACTIONS } from '../../../../../store/actions';
import { CONSTANTS, HELPER } from '../../../../../utils';

const ShipmentLocation = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const { activeStep } = props; 
    const { metaCountryList, metaLoading } = useSelector((state) => state.metadata);
    const { addedProduct } = useSelector((state) => state.products);

    const [country, setCountry] = useState(addedProduct?.shipment_and_location?.country);
    const [freeShipping, setFreeShipping] = useState(addedProduct?.shipment_and_location?.freeShipping);
    const [worldWideShipping, setWorldWideShipping] = React.useState(addedProduct?.shipment_and_location?.worldWideShipping);
    const [shippingPrice, setShippingPrice] = useState(addedProduct?.shipment_and_location?.shippingPrice);

    useEffect(() => {
        if (HELPER.isEmpty(metaCountryList)) {
            dispatch(META_ACTIONS.COUNTRIES_LIST());
        }
        return () => { };
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            handleNextAction() {
                dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT_DATA(activeStep, CONSTANTS.PRODUCT_ADDED.SHIPMENT_AND_LOCATION, {
                    country,
                    freeShipping,
                    shippingPrice,
                    worldWideShipping,
                }))
            },
            handleValidationAction() {
                let error = false;
                let errorDescription = "";
                if (HELPER.isEmpty(country)) {
                    error = true;
                    errorDescription = "Location is required."
                }
                if (!freeShipping && HELPER.isEmpty(shippingPrice)) {
                    error = true;
                    errorDescription = "Shipping Price field is required."
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
        setFreeShipping(event.target.checked);
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
                                                placeholder="Select your country"
                                                required={true}
                                                size="md"
                                                defaultValue={country}
                                                onChange={(e, values) => setCountry(values)}
                                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                                getOptionLabel={(option) => option.name}
                                                options={metaCountryList}
                                                loading={metaLoading}
                                                startDecorator={<AddLocationAltIcon />}
                                                endDecorator={
                                                    metaLoading ? (
                                                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                                    ) : null
                                                }
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
                                                        checked={freeShipping}
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
                                            <Input
                                                name="Outlined"
                                                value={shippingPrice}
                                                variant="outlined"
                                                type="number"
                                                disabled={freeShipping}
                                                placeholder="Enter Shipping Price"
                                                onChange={(event) => {
                                                    const newValue = Number(event.target.value);
                                                    if (newValue >= 0 && newValue <= 10000) setShippingPrice(newValue);
                                                }}
                                                startDecorator={<PaidOutlinedIcon />}
                                            />
                                        </Col>
                                        <Col lg="12" md="12" sm="12" xs="12" className='shipment-section pt-4'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        disabled={freeShipping}
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