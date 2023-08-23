import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import CategoryIcon from '@mui/icons-material/Category';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import GradeIcon from '@mui/icons-material/Grade';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@mui/joy';
import { CONSTANTS, HELPER } from '../../../../../utils';
import { PRODUCT_ACTIONS } from '../../../../../store/actions';

const ItemInfo = forwardRef((props, ref)  => {
    const dispatch = useDispatch()

    const { activeStep } = props;
    const { color, brands, categories, condition, size, standard , addedProduct } = useSelector((state) => state.products);

    const [value, setValue] = useState([]);

    const [category, setCategory] = useState(addedProduct?.item_information?.category);
    const [categoryHasSubCategory, setCategoryHasSubCategory] = useState(true);
    const [subCategoryLoading, setSubCategoryLoading] = useState(true);
    const [subCategoryPlaceholder, setSubCategoryPlaceholder] = useState("Choose Sub Category");
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState(addedProduct?.item_information?.subCategory);
    const [brand, setBrand] = useState(addedProduct?.item_information?.brand);
    const [productcondition, setCondition] = useState(addedProduct?.item_information?.condition);
    const [sizeChart, setSizeChart] = useState(addedProduct?.item_information?.size);
    const [quantity, setQuantity] = useState(addedProduct?.item_information?.quantity);
    const [standardSize, setStandardSize] = useState(addedProduct?.item_information?.standard);
    const [productColor, setColor] = useState(addedProduct?.item_information?.color);
    useImperativeHandle(
        ref,
        () => ({
            handleNextAction() {
                dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT_DATA(activeStep, CONSTANTS.PRODUCT_ADDED.ITEM_INFORMATION, {
                    category,
                    subCategory,
                    brand,
                    condition: productcondition,
                    size: sizeChart,
                    quantity,
                    standard: standardSize,
                    color: productColor,
                }))
            },
            handleValidationAction() {
                let error = false;
                let errorDescription = "";
                if(HELPER.isEmpty(category)){
                    error = true;
                    errorDescription = "Product category is required."
                }
                if(categoryHasSubCategory && HELPER.isEmpty(subCategory)){
                    error = true;
                    errorDescription = "Product sub category is required."
                }
                if(HELPER.isEmpty(brand)){
                    error = true;
                    errorDescription = "Product brand is required."
                }
                if(HELPER.isEmpty(condition)){
                    error = true;
                    errorDescription = "Product condition is required."
                }
                if(HELPER.isEmpty(size)){
                    error = true;
                    errorDescription = "Product size is required."
                }
                if(HELPER.isEmpty(quantity)){
                    error = true;
                    errorDescription = "Product quantity is required."
                }
                if(HELPER.isEmpty(standard)){
                    error = true;
                    errorDescription = "Product standard is required."
                }
                if(HELPER.isEmpty(color)){
                    error = true;
                    errorDescription = "Product color is required."
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
    
  
    useEffect(() => {
        if(HELPER.isNotEmpty(subCategory)) {
            setCategoryHasSubCategory(true)
            setSubCategoryLoading(false)
            // setColor()
        }
      }, []);
  
    useEffect(() => {
        if(HELPER.isNotEmpty(category)) {
            let subCategoriesList = category?.children;
            if(HELPER.isNotEmpty(subCategoriesList)) {
                let formatSubCategories = [];
                const options = subCategoriesList.map((option) => {
                    const label = option.label[0];
                    if(HELPER.isNotEmpty(option.children)) {
                        option.children.map((subOption) => {
                            formatSubCategories.push({
                                parentLabel: HELPER.isNotEmpty(option?.label) ? option?.label : category?.label,
                                label: subOption?.label,
                                value: subOption?.value,
                              });
                        });
                    }else {
                        formatSubCategories.push({
                            parentLabel: category?.label,
                            label: option?.label,
                            value: option?.value,
                          });
                    }
                });
                setSubCategories(formatSubCategories);
            }else {
                setCategoryHasSubCategory(false);
                setSubCategoryLoading(false);
                setSubCategoryPlaceholder("No sub category found");
            }
        }
      }, [category]);
    
    
  


    return (
        <Container className='dashboard-product-section'>
            <Row>
                <Col className="collection-content">
                    <div className="page-main-content">
                        <div className="top-banner-wrapper">
                            <div className="top-banner-content small-section pb-0">
                                <h4>Item Information</h4>
                                <div>
                                    <Row className='mt-4'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Category</b></h6>
                                            <Autocomplete
                                                startDecorator={<AddBusinessIcon />}
                                                placeholder="Choose Category"
                                                options={categories}
                                                value={category}
                                                onChange={(event, newValue, reason) => {
                                                    if (
                                                        event.type === "keydown" &&
                                                        event.key === "Backspace" &&
                                                        reason === "removeOption"
                                                    ) {
                                                        return;
                                                    }
                                                    setCategory(newValue);
                                                    // setSubCategories(newValue?.children);
                                                    setSubCategoryLoading(false);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Sub Category</b></h6>
                                            <Autocomplete
                                                startDecorator={<CategoryIcon />}
                                                placeholder={subCategoryPlaceholder}
                                                options={subCategories}
                                                value={subCategory}
                                                disabled={subCategoryLoading}
                                                groupBy={(option) => option.parentLabel}
                                                onChange={(event, newValue, reason) => {
                                                    if (
                                                        event.type === "keydown" &&
                                                        event.key === "Backspace" &&
                                                        reason === "removeOption"
                                                    ) {
                                                        return;
                                                    }
                                                    setSubCategory(newValue);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Brand</b></h6>
                                            <Autocomplete startDecorator={<BrandingWatermarkIcon />}
                                                placeholder="Choose Brand"
                                                options={brands}
                                                value={brand}
                                                defaultValue={[]}
                                                onChange={(event, newValue, reason) => {
                                                    setBrand(newValue);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Condition</b></h6>
                                            <Autocomplete
                                                startDecorator={<GradeIcon />}
                                                placeholder="Choose Condition"
                                                options={condition}
                                                value={productcondition}
                                                onChange={(event, newValue, reason) => {
                                                    if (
                                                        event.type === "keydown" &&
                                                        event.key === "Backspace" &&
                                                        reason === "removeOption"
                                                    ) {
                                                        return;
                                                    }
                                                    setCondition(newValue);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Size</b></h6>
                                            <Autocomplete
                                                startDecorator={<PlaylistAddIcon />}
                                                placeholder="Choose Size"
                                                value={sizeChart}
                                                defaultValue={[]}
                                                multiple
                                                options={size}
                                                onChange={(event, newValue, reason) => {
                                                    setSizeChart(newValue);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Quantity</b></h6>
                                                <Input 
                                                    name="Outlined"
                                                    value={quantity}
                                                    variant="outlined"
                                                    type="number"
                                                    placeholder="Enter Quantity"
                                                    onChange={(event) => {
                                                      const newValue = Number(event.target.value);
                                                      if (newValue >= 0 && newValue <= 10000) setQuantity(newValue);
                                                    }}
                                                    startDecorator={<ProductionQuantityLimitsIcon />}
                                                />
                                        </Col> 
                                    </Row>
                                    <Row className='mt-2'>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Standard</b></h6>
                                            <Autocomplete
                                                startDecorator={<SettingsInputSvideoIcon />}
                                                placeholder="Choose Standard"
                                                options={standard}
                                                value={standardSize}
                                                onChange={(event, newValue, reason) => {
                                                    if (
                                                        event.type === "keydown" &&
                                                        event.key === "Backspace" &&
                                                        reason === "removeOption"
                                                    ) {
                                                        return;
                                                    }
                                                    setStandardSize(newValue);
                                                }}
                                            />
                                        </Col>
                                        <Col lg="6" md="6" sm="6" xs="6">
                                            <h6><b>Color</b></h6>
                                            <Autocomplete startDecorator={<FormatColorFillIcon />}
                                                placeholder="Choose Color"
                                                size="sm"
                                                // value={productColor}
                                                defaultValue={productColor}
                                                onChange={(event, newValue, reason) => {
                                                    if (
                                                        event.type === "keydown" &&
                                                        event.key === "Backspace" &&
                                                        reason === "removeOption"
                                                    ) {
                                                        return;
                                                    }
                                                    setColor(newValue);
                                                }}
                                                multiple
                                                noOptionsText="No color selected"
                                                renderOption={(props, option, { selected }) => (
                                                    <AutocompleteOption {...props} color="neutral" sx={{
                                                        alignItems: "flex-start",
                                                        borderBottom: "1px solid",
                                                        borderColor: "divider",
                                                        '&[aria-selected="true"]': {
                                                            fontWeight: "normal"
                                                        }
                                                    }}>
                                                        <Box component="span" sx={{
                                                            width: 14,
                                                            height: 14,
                                                            flexShrink: 0,
                                                            borderRadius: "3px",
                                                            mr: 1,
                                                            ml: "5px",
                                                            mt: "4px",
                                                            backgroundColor: option.value
                                                        }} />
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography level="title-sm">{option.label}</Typography>
                                                        </Box>
                                                    </AutocompleteOption>
                                                )}
                                                options={[...color].sort((a, b) => {
                                                    // Display the selected color first.
                                                    let ai = value.indexOf(a);
                                                    ai = ai === -1 ? value.length + color.indexOf(a) : ai;
                                                    let bi = value.indexOf(b);
                                                    bi = bi === -1 ? value.length + color.indexOf(b) : bi;
                                                    return ai - bi;
                                                })}
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

export default ItemInfo;