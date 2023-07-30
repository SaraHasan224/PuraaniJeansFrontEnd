import React, { useState, useContext } from "react";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import parse  from 'html-react-parser'
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import CartContext from "../../../context/cart";

const ProductBox = ({ product, addCart, addWish, addCompare }) => {
  const router = useRouter();
  const [modalCompare, setModalCompare] = useState(false);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const cartContext = useContext(CartContext);
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;
  const uniqueTags = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = () => {
    router.push(`/product-details/${product.handle}`, undefined, { shallow: true });
  };

  return (
    <div className="product-box">
      <div className="img-wrapper">
        <div className="front" onClick={clickProductDetail}>
          <a href="#!">
            <Media
              src={product.image}
              className="img-fluid blur-up lazyload"
              alt=""
            />
          </a>
        </div>
        <div className="cart-info cart-wrap">
          <button
            data-toggle="modal"
            data-target="#addtocart"
            title="Add to cart"
          >
            <i className="fa fa-shopping-cart" onClick={addCart}></i>
          </button>
          <a
            href={null}
            data-toggle="modal"
            data-target="#quick-view"
            title="Quick View"
            onClick={toggle}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div className="product-detail" onClick={clickProductDetail}>
        <a href="#!">
          <h6><b>{product.name}</b></h6>
        </a>
        <br/>
        <h4>
          {currency.symbol}
          {(
           product?.discounted_price *
            currency.value
          ).toFixed(2)}
          <del>
            <span className="money">
              {currency.symbol}
              {(product?.price).toFixed(2)}
            </span>
          </del>
        </h4>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="quickview-modal"
        size="lg"
        centered
      >
        <ModalHeader toggle={toggle}>
          <h5 className="modal-title">Quick View</h5> 
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <Media
                  src={product.image}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <h2> {product.title} </h2>
                <h3>
                  {currency.symbol}
                  {(product.price * currency.value).toFixed(2)}
                </h3>
                {product.variants ? (
                  <ul className="color-variant">
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
                                  product.images
                                )
                              }
                            ></li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                  </ul>
                ) : (
                  ""
                )}
                <div className="border-product">
                  <h6 className="product-title">product details</h6>
                  <p>
                      {parse(product.description)}</p>
                </div>
                <div className="product-description border-product">
                  {product.size ? (
                    <div className="size-box">
                      <ul>
                        {product.size.map((size, i) => {
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
                          onClick={() => plusQty(product)}
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
                    onClick={() => addCart(product, quantity)}
                  >
                    add to cart
                  </button>
                  <button
                    className="btn btn-solid"
                    onClick={clickProductDetail}
                  >
                    View detail
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ProductBox;
