import { Input, TextField, Textarea } from '@mui/joy';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import {
    Container,
    Row,
    Col,
} from "reactstrap";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { CONSTANTS, HELPER } from '../../../../../../../utils';
import { PRODUCT_ACTIONS } from '../../../../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function getAllCombinations(arr, index) {
    var result = [];
    if (index == arr.length - 1) {
        for (var i = 0; i < arr[index].length; i++) {
            result.push([arr[index][i]]);
        }
    } else {
        var next = getAllCombinations(arr, index + 1);
        for (var i = 0; i < arr[index].length; i++) {
            for (var j = 0; j < next.length; j++) {
                result.push([arr[index][i]].concat(next[j]));
            }
        }
    }
    return result;
}
function formatVariantOptions(variants, quantity, description, discountedPrice, price) {
    return variants.map((variant, key) => {
        return {
            price: price,
            discounted_price: discountedPrice,
            qty: quantity,
            description: description,
            variation: variant
        }
    });
}

function updateVariantOptions(variants, qty, price, discountedPrice, description) {
    return variants.map((variant, key) => {
        return {
            price: HELPER.isNotEmpty(price[key]) ? price[key] : variant?.price,
            discounted_price: HELPER.isNotEmpty(discountedPrice[key]) ? discountedPrice[key] : variant?.discounted_price,
            qty: HELPER.isNotEmpty(qty[key]) ? qty[key] : variant?.qty,
            description: HELPER.isNotEmpty(description[key]) ?  description[key]: variant?.description,
            variation: variant?.variation
        }
    });
}

function objectToArr(oldObj, keyName) {
    return Object.entries(oldObj).map(([name, obj]) => ({ name: keyName, ...obj }))
}

function filter(data, keyName) {
    return data.filter((i, key) => i[key] === keyName);
}


const VariantsInfo = forwardRef((props, ref) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const { activeStep } = props;
    
    const { productAdded, addedProduct } = useSelector((state) => state.products);
    const { closetRef } = useSelector((state) => state.auth);

    const { item_information, photo_and_description, shipment_and_location, product_variants } = addedProduct;
    const { color, condition, size, standard, quantity } = item_information;
    const { description, discountedPrice, price } = photo_and_description;

    const editorRef = useRef()
    const { CKEditor, ClassicEditor} = editorRef.current || {}
    const [variantDescription, setVariantDescription] = useState('');
    const [variantQty, setVariantQty] = useState('');
    const [variantPrice, setVariantPrice] = useState('');
    const [variantDiscountedPrice, setVariantDiscountedPrice] = useState('');
    const [variants, setVariants] = useState([]);


    useEffect(() => {
        var arr = [objectToArr(color, "color"), objectToArr({ condition }, "condition"), objectToArr(size, "size"), objectToArr({ standard }, "standard")];
        var result = getAllCombinations(arr, 0);
        setVariants(formatVariantOptions(result, quantity, description, discountedPrice, price));
        
        editorRef.current = {
            CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor, //Added .CKEditor
            ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' ),
          }
    }, []);

    useEffect(() => {
        if(productAdded) {
            router.push(`/account/closet/dashboard/${closetRef}`, undefined, { shallow: true });
        }
    }, [productAdded]);
    
    useImperativeHandle(
        ref,
        () => ({
            handleNextAction() {
                const variantsUpdated = updateVariantOptions(variants, variantQty, variantPrice, variantDiscountedPrice, variantDescription);
                setVariants(variantsUpdated);
                alert("Child handleNext Function Called")
                dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT_DATA(activeStep, CONSTANTS.PRODUCT_ADDED.VARIANTS, {
                    variants: variantsUpdated
                }))
            },
            handleValidationAction() {
                const variantsUpdated = updateVariantOptions(variants, variantQty, variantPrice, variantDiscountedPrice, variantDescription);
                setVariants(variantsUpdated);
                let error = false;
                let errorDescription = "";
                return {
                    'error': error,
                    'description': errorDescription
                };
            },
            handleWizardCompleteAction() {
                alert("Child handleWizardCompleteAction Function Called")
                dispatch(PRODUCT_ACTIONS.ADD_NEW_PRODUCT({
                    'name': photo_and_description?.name,
                    'sku': photo_and_description?.sku,
                    'short_description': photo_and_description?.description,
                    'price': photo_and_description?.price,
                    'discounted_price': photo_and_description?.discountedPrice,
                    "category": {
                        "parent": item_information?.category?.value,
                        "child": item_information?.subCategory?.value
                    },
                    'brands': item_information?.brand,
                    'max_quantity': item_information?.quantity,
                    'variants': HELPER.isNotEmpty(product_variants?.variants) ? product_variants?.variants : variants,
                    "images": photo_and_description?.images,
                    "shipment": {
                        "country": shipment_and_location?.country?.id,
                        "freeShipping": shipment_and_location?.freeShipping,
                        "shippingPrice": shipment_and_location?.shippingPrice,
                        "worldWideShipping": shipment_and_location?.worldWideShipping
                    }
                }));
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
                                    {variants.map((variant, key) => (
                                        <>
                                            <Row className='mt-4' key={`p-variantname-${key}`}>
                                                <Col lg="12" md="12" sm="12" xs="12">
                                                    <div className="account-setting">
                                                        <h6><b>Variant: </b></h6>
                                                        {
                                                            variant?.variation.map((variationDetail, key) => {
                                                                return (<><b>{HELPER.firstLetterCapitalize(variationDetail?.name)}</b>: <span className='variantOption'>{variationDetail?.label} &nbsp;</span></>)
                                                            })
                                                        }

                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='mt-4' key={`p-variant-${key}`}>
                                                <Col lg="2" md="2" sm="2" xs="2">
                                                    <div className="account-setting">
                                                        <h6><b>Quantity</b></h6>
                                                        <Input
                                                            name="Outlined"
                                                            value={variantQty[key] ?? quantity}
                                                            variant="outlined"
                                                            type="number"
                                                            placeholder="Quantity"
                                                            onChange={(event) => {
                                                                const newValue = Number(event.target.value);
                                                                if (newValue >= 0 && newValue <= 10000) setVariantQty({...variantQty, [key]: newValue});
                                                            }}
                                                            startDecorator={<ProductionQuantityLimitsIcon />}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="2" md="2" sm="2" xs="2">
                                                    <div className="account-setting">
                                                        <h6><b>Price</b></h6>
                                                        <Input
                                                            name="Outlined"
                                                            value={variantPrice[key] ?? price}
                                                            variant="outlined"
                                                            type="number"
                                                            placeholder="Price"
                                                            onChange={(event) => {
                                                                const newValue = Number(event.target.value);
                                                                if (newValue >= 0 && newValue <= 10000) setVariantPrice({...variantPrice, [key]: newValue});
                                                            }}
                                                            startDecorator={<PaidOutlinedIcon />}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="2" md="2" sm="2" xs="2">
                                                    <div className="account-setting">
                                                        <h6><b>Discounted Price</b></h6>
                                                        <Input
                                                            name="Outlined"
                                                            value={variantDiscountedPrice[key] ?? discountedPrice}
                                                            variant="outlined"
                                                            type="number"
                                                            placeholder="Discounted price"
                                                            onChange={(event) => {
                                                                const newValue = Number(event.target.value);
                                                                if (newValue >= 0 && newValue <= 10000 && newValue < variantDiscountedPrice[key]) setVariantDiscountedPrice({...variantDiscountedPrice, [key]: newValue});
                                                            }}
                                                            startDecorator={<LocalOfferOutlinedIcon />}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col lg="6" md="6" sm="6" xs="6">
                                                    <div className="account-setting">
                                                        <h6><b>Description</b></h6>
                                                        {<CKEditor
                                                            editor={ClassicEditor}
                                                            data={variantDescription[key] ?? ''}
                                                            config={CONSTANTS.CKEDITOR_CONFIG}
                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData()
                                                                setVariantDescription({...variantDescription, [key]: event.target.value});
                                                            }}
                                                        /> }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
});

export default VariantsInfo;