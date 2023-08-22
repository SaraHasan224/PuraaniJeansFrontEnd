import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Row, Col, Media, Modal, ModalBody, ModalHeader } from "reactstrap";
import parse  from 'html-react-parser'

import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import CartContext from "../../../context/cart";
import FeaturedProductDetail from "./featured-detail";
import { toast } from "react-toastify";

const ProductItem = ({
  product,
  addCart,
  addWishlist,
  addToCompare,
  spanClass,
}) => {
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;

  const router = useRouter();
  const cartContext = useContext(CartContext);

  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const uniqueTags = [];

  const onClickHandle = (img) => {
    setImage(img);
  };

  const changeQty = (e) => {
    if (product.qty >= e.target.value) {
      setQuantity(parseInt(e.target.value));
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  const clickProductDetail = () => {
    router.push(`/product-details/${product.handle}`, undefined, { shallow: true });
  };

  const variantChangeByColor = (imgId, product_images) => {
    product_images.map((data) => {
      if (data.image_id == imgId) {
        setImage(data.src);
      }
    });
  };

  let RatingStars = [];
  for (var i = 0; i < product.rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }


  return (
    <>
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === "true" ? <span className="lable3">new</span> : ""}
          {product.sale === "true" ? (
            <span className="lable4">on sale</span>
          ) : (
            ""
          )}
        </div>
        <div className="front" onClick={clickProductDetail}>
          <Media
            src={`${product.image}`}
            className="img-fluid"
            alt=""
          />
        </div>
        {product.default === "undefined" ? (
          <div className="back" onClick={clickProductDetail}>
            <Media
              src={`${image ? image : product.default.src}`}
              className="img-fluid"
              alt=""
            />
          </div>
        ) : (
          ""
        )}

        <div className={`cart-info cart-wrap`}>
          <button title="Add to cart" onClick={addCart}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
          {/* <a href={null} title="Add to Wishlist" onClick={addWishlist}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </a> */}
          <a href={null} title="Quick View" onClick={toggle}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          {/* <a href={null} title="Compare" onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a> 
          <Modal isOpen={modalCompare} toggle={toggleCompare} centered>
            <ModalHeader toggle={toggleCompare}>Quick View</ModalHeader>
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={`${
                        product.variants && image
                          ? image
                          : product.images[0].src
                      }`}
                      alt=""
                      className="img-fluid"
                    />
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>Item{" "}
                        <span>{product.title} </span>
                        <span> successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link href="/page/compare">
                          <a
                            href={null}
                            className="btn-sm btn-solid"
                            onClick={addToCompare}
                          >
                            View Compare list
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>*/}
        </div>
        {product.images ? (
          <ul className="product-thumb-list">
            {product.images.map((img, i) => (
              <li
                className={`grid_thumb_img ${img.url === image ? "active" : ""}`}
                key={i}
              >
                <a href={null} title="Add to Wishlist">
                  <Media
                    src={`${img.url}`}
                    alt="wishlist"
                    onClick={() => onClickHandle(img.url)}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <FeaturedProductDetail
        product={product}
        productDetail=""
        currency={currency}
        uniqueTags={uniqueTags}
        variantChangeByColor={variantChangeByColor}
        detailClass="text-center"
      />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-lg quickview-modal"
        centered
        size="lg"
      >
        <ModalBody>
          <Row>
            <Col lg="6" xs="12">
              <div className="quick-view-img">
                <Media
                  src={`${
                    product.variants && image ? image : product.images[0].src
                  }`}
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
                  <p>{ parse(product.description) ?? ""}</p>
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
      <div className="product-box product-wrap d-none">
        <div className="img-wrapper">
          <div className="lable-block">
            {product.discount_badge.show == 0 ? <span className="lable3">new</span> : ""}
            {product.discount_badge.show == 1 ? (
              <span className="lable4">on sale</span>
            ) : (
              ""
            )}
          </div>
          <div className="front">
            <a href={null}>
              <Media
                alt=""
                src={product.image}
                className="img-fluid blur-up lazyload bg-img"
              />
            </a>
          </div>
          <div className="cart-info cart-wrap">
            <a href={null} title="Add to Wishlist" onClick={addWishlist}>
              <i className="fa fa-heart" aria-hidden="true"></i>
            </a>
            <button onClick={addCart} title="Add to cart">
              <i className="fa fa-shopping-cart"></i>
              <span>Add to cart</span>
            </button>
           
          </div>
        </div>
        <div className="product-info">
          {/* <div className="rating">{RatingStars}</div> */}
          <h6>{product.name}</h6>
          <h4>
            {currency.symbol}
            {(product.discounted_price).toFixed(2)}
            <del>
              <span className="money">
                {currency.symbol}
                {(product.price).toFixed(2)}
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
                  <h2> {product.name} </h2>
                  <h3>
                    {currency.symbol}
                    {(product.price).toFixed(2)}
                  </h3>
                  {/* {product.variants ? (
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
                  )} */}
                  <div className="border-product">
                    <h6 className="product-title">product details</h6>
                    <p>
                      { parse(product.description) ?? ""}
                    </p>
                  </div>
                  <div className="product-description border-product">
                    {/* {product.size ? (
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
                    )} */}
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
    </>
  );
};

export default ProductItem;