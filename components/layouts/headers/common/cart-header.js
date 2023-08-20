import React, { Fragment, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../../context/cart";
import { Media } from "reactstrap";

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext);
  console.log("item ", item)
  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={"/product-details/" + item.handle}>
            <a>
              <Media alt="" className="me-3" src={`${item.image}`} />
            </a>
          </Link>
          <div className="media-body align-left">
            <Link href={"/product-details/" + item.handle}><h5>{item.name}</h5></Link>

            <h4>
              <span>
                {item.qty} x {symbol}
                {(item.price).toFixed(2)}
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  );
};

export default CartHeader;
