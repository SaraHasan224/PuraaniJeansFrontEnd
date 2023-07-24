import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";

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
      cartItems[index] = {
        ...item,
        qty: quantity,
        total: (item.discounted_price) * quantity,
      };
      setCartItems([...cartItems]);
    } else {
      const product = {
        ...item,
        qty: quantity,
        total: item.discounted_price,
      };
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (item) => {
    toast.error("Product Removed Successfully !");
    setCartItems(cartItems.filter((e) => e.id !== item.id));
  };

  const minusQty = () => {
    alert("minus Qty")
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item) => {
    if (item.qty >= quantity) {
      setQuantity(quantity + 1);
    } else {
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
