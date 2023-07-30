import React, { useState, useContext } from "react";
import Link from "next/link";
import parse  from 'html-react-parser'
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../context/Currency/CurrencyContext";
import CartContext from "../../../context/cart";
// import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";
import { CONSTANTS, HELPER } from "../../../utils";
import { toast } from "react-toastify";
// import {AccordionHeader, AccordionContent} from "@mui/material/AccordionDetails";


const ProductOptions = ({ product, attribute, selectedOption }) => {
  const dispatch = useDispatch();
  const { options } = attribute;
  //talha get updated variant (need to test)
  const { selected_variant, variants } = product;

  const handleChangeOption = option => {
    //search for option in variant ref
    let _isAny = false;
    let variant_ids = product?.variant_ref.filter(e => e.options === option.id);
    if (variant_ids?.length === 0) {
      _isAny = true;
      variant_ids = product?.variant_ref.filter(
        e => e.options === 0 && e.attribute_id === attribute.id
      );
    }
    var getOtherOptions = selected_variant.attributes?.filter(
      e => e.id !== selectedOption?.id
    );

    //find matching variant ids of all arrays
    let variantDetails = [];
    let i = 0;
    while (i !== getOtherOptions.length) {
      let _optionId = getOtherOptions[i]?.options?.id;
      let filterByOption = product?.variant_ref.filter(
        e => e.options === _optionId
      );
      variantDetails = findCommonByKey(
        variant_ids,
        filterByOption,
        "variant_id"
      );
      i++;
    }
    let _variant_update = variants.find(
      e =>
        e?.variant_id ===
        (variantDetails[0]?.variant_id ?? variant_ids[0]?.variant_id)
    );
    //if array in options
    let newAttributes = [];
    _variant_update?.attributes.forEach(item => {
      if (_isAny && attribute?.id === item.id) {
        item.options = option;
        newAttributes.push(item);
      } else if (Array.isArray(item?.options)) {
        newAttributes.push(
          selected_variant?.attributes.find(e => e.id === item?.id)
        );
      } else {
        newAttributes.push(item);
      }
    });
    if (HELPER.isNotEmpty(newAttributes)) {
      _variant_update.attributes = newAttributes;
      dispatch(cartActions.SELECT_PRODUCT_VARIANT(product, _variant_update));
    }
  };

  return (
    <div className="sizeVar varBtns">
      {options?.map(option => {
        let found = product?.attributes.find(
          e =>
            e.attribute_id === option.attribute_id &&
            (e.option_id === option.option_id || e.option_id === 0)
        );
        let selected = selectedOption?.options?.value === option.value;
        let isDisabled = true;
        if (
          product?.available_options?.includes(option.id) ||
          product?.variant_ref.find(
            e => e.attribute_id === selectedOption.id && e.options === 0
          )
        ) {
          isDisabled = false;
        }
        return found ? (
          <button
            className={`Capitalize ${selected ? "selected" : ""}
                            ${isDisabled ? "disabled-grey" : ""}`}
            key={`options-${option.value}`}
            onClick={() => handleChangeOption(option)}
            disabled={isDisabled}
          >
            {option?.value}
          </button>
        ) : (
          ""
        );
      })}
    </div>
  );
};
const ProductAtrributes = ({
  product,
  selected_product,
  maxQty,
  itemQtyInCart,
  loadingCart,
  isAdd,
  cart_item,
}) => {
  const { attributes, has_variants, selected_variant } = product;
  const selectedVariantOptions = selected_variant?.attributes;
  const selectedVariant = HELPER.getSelectedVariant(product);
  return has_variants === CONSTANTS.YES && HELPER.isNotEmpty(attributes) ? (
    <div className="prodSelectVar">
      <div
        className={`name-attr-scroll ${
          cart_item.quantity ? "qty-inc-padding" : ""
        }`}
      >
        <div className="img-name-price">
          <div className="image-content">
            <img
              loading="lazy"
              src={product.images[0]?.url}
              alt={product?.name}
            />
          </div>
          <div className="name-price">
            <div className="name">
              {product?.name}
            </div>
            <div className="price">
              <div className="strikeText">
                {selectedVariant?.price}{" "}
              </div>
              <span className="pricing">
                {selectedVariant?.discounted_price}
              </span>
              {/* {!!cart_item.quantity && <span> x {cart_item.quantity}</span>} */}
            </div>
          </div>
        </div>
        {attributes?.map(attr => {
          let selectedAttrOption = selectedVariantOptions?.find(
            selectedVariantOption => {
              return selectedVariantOption.id === attr.id;
            }
          );
          return (
            <div
              className="prodSelectSize prodVar-Dialog"
              key={`attribute-${attr.handle}`}
            >
              {/* <Accordion> */}
                {/* <AccordionSummary expandIcon={<i className="icon-right" />}> */}
                  <div className="accHeader">
                    <div className="Capitalize">{attr.name}</div>
                    <span className="options Capitalize">
                      {selectedAttrOption?.options?.value}
                    </span>
                  </div>
                {/* </AccordionSummary> */}
                {/* <AccordionDetails> */}
                  <ProductOptions
                    product={product}
                    attribute={attr}
                    selectedOption={selectedAttrOption}
                  />
                {/* </AccordionDetails> */}
              {/* </Accordion> */}
            </div>
          );
        })}
      </div>

      {selected_product?.shipment_available === CONSTANTS.YES &&
      !selected_product?.product_unavailable ? (
        <>
          <div className="quantity-cart-btns mb-1">
            <div className="update-qty">
              <div className="qty-heading">
                {!!cart_item.quantity && <span>Quantity</span>}
              </div>

              <div className="cart-actions">
                {maxQty === 0 ? (
                  <div className="outOfStock">Out of stock</div>
                ) : (
                  <CartActions detailView={true} />
                )}
              </div>
            </div>
            <div className="buttons">
              {!cart_item.quantity && (
                <Button
                  type="outlined"
                  className={`addedinCartBtn ${
                    itemQtyInCart + 1 > maxQty ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (itemQtyInCart + 1 <= maxQty) {
                      // PRODUCT_HELPER.ADD_PRODUCT_TO_CART(selected_product);
                    }
                  }}
                  disabled={loadingCart}
                >
                  {/* {loadingCart ? (
                    <>
                      {isAdd
                        ? translate("CART_ACTIONS.ADDING_IN_CART")
                        : translate("CART_ACTIONS.UPDATING_CART")}{" "}
                    </>
                  ) : (
                    translate("CART_ACTIONS.ADD_TO_CART")
                  )} */}
                </Button>
              )}
              <Button onClick={() => true}>
              {/* <Button onClick={() => PRODUCT_HELPER.BUY_NOW(selected_product)}> */}
                {/* {translate("CART_ACTIONS.BUY_NOW")} */}
              </Button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
};

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const cartContext = useContext(CartContext);
  const stock = cartContext.stock;
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;
  const uniqueColor = [];
  const uniqueSize = [];

  const selected_variant = HELPER.getSelectedVariant(product);
  const changeQty = (e) => {
    if (selected_variant.max_quantity >= e.target.value) {
      setQuantity(parseInt(e.target.value));
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.name} </h2>
        <h4>
          <del>
            {symbol}
            {selected_variant?.price}
          </del>
          <span>{selected_variant?.discount}% off</span>
        </h4>
        <h3>
          {symbol}
          {selected_variant?.discounted_price}
        </h3>
        <ProductAtrributes product={product} />
        {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })}
        {changeColorVar === undefined ? (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li className={vari.color} key={i} title={vari.color}></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() => changeColorVar(i)}
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )}
        <div className="product-description border-product">
          {product.variants ? (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={null}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media src={sizeChart.src} alt="size" className="img-fluid" />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data, i) => {
                    return (
                      <li key={i}>
                        <a href={null}>{data}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">{stock}</span>
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
              <Input
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
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => cartContext.addToCart(product, quantity)}
          >
            add to cart
          </a>
          <Link href={`/page/account/checkout`}>
            <a className="btn btn-solid">buy now</a>
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>
            
          {parse(HELPER.isNotEmpty(selected_variant?.variant_short_description) ? 
                        selected_variant?.variant_short_description : product?.short_description)}
          </p>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          {/* <h6 className="product-title">Time Reminder</h6> */}
          {/* <CountdownComponent /> */}
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
