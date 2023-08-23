import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";
import { HELPER } from "../../utils";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");

  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + b.total, 0);
    setCartTotal(Total);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (item, quantity) => {
    toast.success("Product Added Successfully !");
    const index = cartItems.findIndex((itm) => itm.id === item.id);

    if (index !== -1) {
      console.log("item: ", item)
      cartItems[index] = {
        ...item,
        qty: quantity,
        total: ((item.discounted_price) * quantity)+parseInt(HELPER.isNotEmpty(item?.shipping_cost) ? item?.shipping_cost : 0),
      };
      console.log("cartItems: ", cartItems[index])
      setCartItems([...cartItems]);
    } else {
      console.log("item: ", item)
      const product = {
        ...item,
        qty: quantity,
        total: ((item.discounted_price) * quantity)+parseInt(HELPER.isNotEmpty(item?.shipping_cost) ? item?.shipping_cost : 0),
      };
      console.log("cartItems: ", product)
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (item) => {
    toast.error("Product Removed Successfully !");
    setCartItems(cartItems.filter((e) => e.id !== item.id));
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item, itemSelectedVariant = {}) => {
    let allowedQty = item?.qty;
    if(HELPER.isNotEmpty(itemSelectedVariant)) {
      let selected_variant = HELPER.getSelectedVariant(item);
      allowedQty = selected_variant?.max_quantity;
    }
    if (allowedQty >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
      toast.error("Product is out of stock !");
      setStock("Out of stock !");
    }
  };

  // Update Product Quantity
  const updateQty = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id);
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: item.discounted_price * quantity,
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          total: item.discounted_price * quantity,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Updated !");
      }
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
