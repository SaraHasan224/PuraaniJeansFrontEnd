import React, { useContext, useState, useRef ,useEffect} from 'react';
import { Container, Row, Col ,Media} from 'reactstrap';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import DetailsWithPrice from '../common/detail-price';
import ImageZoom from '../common/image-zoom';
import CartContext from '../../../context/cart';
import { CurrencyContext } from '../../../context/Currency/CurrencyContext';
import { HELPER } from '../../../utils';

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