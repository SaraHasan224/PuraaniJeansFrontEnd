import React, { useContext, useState, useRef ,useEffect} from 'react';
import { Container, Row, Col ,Media} from 'reactstrap';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import DetailsWithPrice from '../common/detail-price';
import ImageZoom from '../common/image-zoom';
import CartContext from '../../../context/cart';
import { CurrencyContext } from '../../../context/Currency/CurrencyContext';
import { HELPER } from '../../../utils';
/*
var data = {   
    "id": 1,
    "title": "trim dress",
    "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
    "type": "fashion",
    "brand": "nike",
    "collection": ["new products"],
    "category": "Women",
    "price": 145,
    "sale": true,
    "discount": "40",
    "stock": 5,
    "new": true,
    "tags": [
        "new",
        "s",
        "m",
        "yellow",
        "white",
        "pink",
        "nike"
    ],
    "variants": [
        {
            "variant_id": 101,
            "id": 1.1,
            "sku": "sku1",
            "size": "s",
            "color": "yellow",
            "image_id": 111
        },
        {
            "variant_id": 102,
            "id": 1.2,
            "sku": "sku2",
            "size": "s",
            "color": "white",
            "image_id": 112
        },
        {
            "variant_id": 103,
            "id": 1.3,
            "sku": "sku3",
            "size": "s",
            "color": "pink",
            "image_id": 113
        },
        {
            "variant_id": 104,
            "id": 1.4,
            "sku": "sku4",
            "size": "m",
            "color": "yellow",
            "image_id": 111
        },
        {
            "variant_id": 105,
            "id": 1.5,
            "sku": "sku5",
            "size": "m",
            "color": "white",
            "image_id": 112
        },
        {
            "variant_id": 106,
            "id": 1.6,
            "sku": "sku5",
            "size": "m",
            "color": "pink",
            "image_id": 113
        },
        {
            "variant_id": 107,
            "id": 1.7,
            "sku": "sku1",
            "size": "l",
            "color": "yellow",
            "image_id": 111
        }
    ],
    "images": [
        {
            "image_id": 111,
            "id": 1.1,
            "alt": "yellow",
            "src": "/assets/images/pro3/39.jpg",
            "variant_id": [
                101,
                104
            ]
        },
        {
            "image_id": 112,
            "id": 1.2,
            "alt": "white",
            "src": "/assets/images/pro3/6.jpg",
            "variant_id": [
                102,
                105
            ]
        },
        {
            "image_id": 113,
            "id": 1.3,
            "alt": "pink",
            "src": "/assets/images/pro3/25.jpg",
            "variant_id": [
                103,
                106
            ]
        }
    ]
}
*/
var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
    infinite: false
};
var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    vertical:true,
    focusOnSelect: true,
    infinite: false
};

const LeftImagePage = () => {
    const { product, loading } = useSelector((state) => state.products);


    const context = useContext(CartContext);
    const addToCart = context.addToCart;
    const curContext = useContext(CurrencyContext);
    const symbol = curContext.state.symbol;
    const [state, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
   
    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current
        });
    }, [product]);

    const changeColorVar = (img_id) => {
        slider2.current.slickGoTo(img_id)
    }

    const { nav1, nav2 } = state;

    return (
        <section>
            <div className="collection-wrapper">
                <Container>
                    {(HELPER.isEmpty(product) || loading) ?
                        'loading'
                        :
                        <Row className="leftImage">
                            <Col lg="1" sm="2" xs="12" className="order-down">
                                <Row>
                                    <Slider className="slider-nav"
                                        {...productsnav}
                                        asNavFor={nav1}
                                        ref={slider => (slider2.current = slider)}
                                    >
                                        {product.images.map((vari, index) =>
                                                <div key={index}>
                                                    <Media src={`${vari.url}`} key={index} alt={vari.alt} className="img-fluid" />
                                                </div>
                                            )}
                                    </Slider>
                                </Row>
                            </Col>
                            <Col lg="5" sm="10" xs="12" className="order-up">
                                <Slider {...products} asNavFor={nav2} ref={slider => (slider1.current = slider)} className="product-right-slick">
                                    {product.variants ?
                                        product.images.map((vari, index) =>
                                            <div key={index}>
                                                <ImageZoom image={vari} />
                                            </div>
                                        ) :
                                        product.images.map((vari, index) =>
                                            <div key={index}>
                                                <ImageZoom image={vari} />
                                            </div>
                                        )}
                                </Slider>
                            </Col>
                            <Col lg="6" className="rtl-text">
                                <DetailsWithPrice symbol={symbol} item={product} changeColorVar={changeColorVar} navOne={state.nav1} addToCartClicked={addToCart} />
                            </Col>
                        </Row>
                    }
                </Container>
            </div>
        </section >
    )
}

export default LeftImagePage;