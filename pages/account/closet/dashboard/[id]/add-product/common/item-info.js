import { Textarea } from '@mui/joy';
import React from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import GradeIcon from '@mui/icons-material/Grade';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';

const ItemInfo = () => {
    return (
        <Container className='dashboard-product-section'>
            <Row>
                <Col className="collection-content">
                    <div className="page-main-content">
                        <div className="top-banner-wrapper">
                            <div className="top-banner-content small-section pb-0">
                                <h4>Item Information</h4>
                                <div className="">
                                    <Row className='mt-4'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Category</b></h6>
                                            <Select
                                                placeholder="Choose Category"
                                                startDecorator={<AddBusinessIcon />}
                                            >
                                                <Option value="dog">Mens/Top</Option>
                                                <Option value="cat">Women</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Sub Category</b></h6>
                                            <Select
                                                placeholder="Choose Sub Category"
                                                startDecorator={<CategoryIcon />}
                                            >
                                                <Option value="dog">Mens/Top</Option>
                                                <Option value="cat">Women</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Brand</b></h6>
                                            <Select
                                                placeholder="Choose Brand"
                                                startDecorator={<BrandingWatermarkIcon />}
                                            >
                                                <Option value="dog">Gucci</Option>
                                                <Option value="cat">Women</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Condition</b></h6>
                                            <Select
                                                placeholder="Choose Condition"
                                                startDecorator={<GradeIcon />}
                                            >
                                                <Option value="dog">Brand New</Option>
                                                <Option value="cat">Used</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Size</b></h6>
                                            <Select
                                                placeholder="Choose Size"
                                                startDecorator={<PlaylistAddIcon />}
                                            >
                                                <Option value="dog">Gucci</Option>
                                                <Option value="cat">Women</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Quantity</b></h6>
                                            <Select
                                                placeholder="Choose Quantity"
                                                startDecorator={<ProductionQuantityLimitsIcon />}
                                            >
                                                <Option value="dog">Brand New</Option>
                                                <Option value="cat">Used</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Standard</b></h6>
                                            <Select
                                                placeholder="Choose Standard"
                                                startDecorator={<SettingsInputSvideoIcon />}
                                            >
                                                <Option value="dog">UK</Option>
                                                <Option value="cat">Women</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Color</b></h6>
                                            <Select
                                                placeholder="Choose Color"
                                                startDecorator={<FormatColorFillIcon />}
                                            >
                                                <Option value="dog">Brand New</Option>
                                                <Option value="cat">Used</Option>
                                                <Option value="fish">Accessories</Option>
                                                <Option value="bird">Bird</Option>
                                            </Select>
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

export default ItemInfo;