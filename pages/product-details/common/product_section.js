import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Container, Row, Col, Media, Modal, ModalBody } from "reactstrap";
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import CartContext from "../../../context/cart";
import { PRODUCT_ACTIONS } from "../../../store/actions";
import { HELPER } from "../../../utils";
import HTMLReactParser from "html-react-parser";



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
const ProductSection = ({ customerRef }) => {
  const router = useRouter();
  const dispatch = useDispatch()

  const { products, loading } = useSelector((state) => state.products?.recentlyViewed);

  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const currency = curContext.state;
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx.addToCart;
  const quantity = cartCtx.quantity;
  const plusQty = cartCtx.plusQty;
  const minusQty = cartCtx.minusQty;
  const setQuantity = cartCtx.setQuantity;
  const [selectedProduct, setSelectedProduct] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  useEffect(() => {
    dispatch(PRODUCT_ACTIONS.GET_RECENTLY_VIEWED_PRODUCT());
  }, []);

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = (product) => {
    router.replace(
      `/product-details/${product.handle}`,
      undefined,
      {
        // shallow: true,
        // unstable_skipClientCache: true
      }
    );
    toggle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedProduct = (item) => {
    setSelectedProduct(item);
    toggle();
  };

  return (
    <section className="section-b-space ratio_asos">
      <Container>
        <Row>
          <Col className="product-related">
            <h2>Recently Viewed</h2>
          </Col>
        </Row>
        <Row className="search-product">
          {HELPER.isEmpty(products) ||
            loading ? (
            "loading"
          ) : (
            <>
              {products.map((product, index) => (
                  <Col xl="2" md="4" sm="6" key={index}>
                    <div className="product-box">
                      <div className="img-wrapper">
                        <div className="front">
                          <a href={null}>
                            <Media
                              onClick={() => clickProductDetail(product)}
                              src={product.image}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="back">
                          <a href={null}>
                            <Media
                              src={product.image}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="cart-info cart-wrap">
                          <button
                            data-toggle="modal"
                            data-target="#addtocart"
                            title="Add to cart"
                            onClick={() => addToCart(product, quantity)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </button>
                          <a
                            href="#"
                            onClick={() => getSelectedProduct(product)}
                            data-toggle="modal"
                            data-target="#quick-view"
                            title="Quick View"
                          >
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <a href={() => clickProductDetail(product)}>
                          <h6>{product.name}</h6>
                        </a>
                        <h4>
                          {symbol}
                          {product.price}
                        </h4>
                        {product.variants ? <ul className="color-variant">
                          <li className="bg-light0"></li>
                          <li className="bg-light1"></li>
                          <li className="bg-light2"></li>
                        </ul> : "" }
                      </div>
                    </div>
                  </Col>
                ))}
            </>
          )}
        </Row>
        {selectedProduct ? (
          <Modal
            isOpen={modal}
            toggle={toggle}
            className="modal-lg quickview-modal"
            centered
          >
            <ModalBody>
              <Row>
                <Col lg="6" xs="12">
                  <div className="quick-view-img">
                    <Media
                      src={`${selectedProduct.image}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col lg="6" className="rtl-text">
                  <div className="product-right">
                    <h2 onClick={() => clickProductDetail(selectedProduct)}> {selectedProduct.name} </h2>
                    <h3>
                      {currency.symbol}
                      {(selectedProduct.price).toFixed(2)}
                    </h3>
                    {selectedProduct.variants ? (
                      <ul className="color-variant">
                        {uniqueTags ? (
                          <ul className="color-variant">
                            {selectedProduct.type === "jewellery" ||
                              selectedProduct.type === "nursery" ||
                              selectedProduct.type === "beauty" ||
                              selectedProduct.type === "electronics" ||
                              selectedProduct.type === "goggles" ||
                              selectedProduct.type === "watch" ||
                              selectedProduct.type === "pets" ? (
                              ""
                            ) : (
                              <>
                                {uniqueTags ? (
                                  <ul className="color-variant">
                                    {uniqueTags.map((vari, i) => {
                                      return (
                                        <li
                                          className={vari.color}
                                          key={i}
                                          title={vari.color}
                                          onClick={() =>
                                            variantChangeByColor(
                                              vari.image_id,
                                              selectedProduct.images
                                            )
                                          }
                                        ></li>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                    <div className="border-product">
                      <h6 className="product-title">
                        Product detail
                      </h6>
                      <p>{HTMLReactParser(selectedProduct.description ?? "")}</p>
                    </div>
                    <div className="product-description border-product">
                      {selectedProduct.size ? (
                        <div className="size-box">
                          <ul>
                            {selectedProduct.size.map((size, i) => {
                              return (
                                <li key={i}>
                                  <a href={null}>{size}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      <h6 className="product-title">quantity</h6>
                      <div className="qty-box">
                        <div className="input-group">
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-left-minus"
                              onClick={minusQty}
                              data-type="minus"
                              data-field=""
                            >
                              <i className="fa fa-angle-left"></i>
                            </button>
                          </span>
                          <input
                            type="text"
                            name="quantity"
                            value={quantity}
                            onChange={changeQty}
                            className="form-control input-number"
                          />
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-right-plus"
                              onClick={() => plusQty(selectedProduct)}
                              data-type="plus"
                              data-field=""
                            >
                              <i className="fa fa-angle-right"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="product-buttons">
                      <button
                        className="btn btn-solid"
                        onClick={() => addToCart(selectedProduct, quantity)}
                      >
                        add to cart
                      </button>
                      <button
                        className="btn btn-solid"
                        onClick={() => clickProductDetail(selectedProduct)}
                      >
                        View detail
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        ) : (
          ""
        )}
      </Container>
    </section>
  );
};

export default ProductSection;
