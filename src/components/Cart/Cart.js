import React, { useState, useEffect } from "react";
import "./Cart.css";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);

    try {
      await axios.patch(`http://localhost:5000/cart/${id}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);

    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => {
        const discountedPrice = item.price - (item.price * item.discount) / 100;
        acc.totalAmount += discountedPrice * item.quantity;
        acc.totalDiscount += (item.price - discountedPrice) * item.quantity;
        return acc;
      },
      { totalAmount: 0, totalDiscount: 0 }
    );
  };

  const { totalAmount, totalDiscount } = calculateTotal();
  const totalOriginalPrice = totalAmount + totalDiscount;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">
                <span className="original-price">₹{item.price}</span>
                <span className="discounted-price">
                  ₹
                  {(item.price - (item.price * item.discount) / 100).toFixed(2)}
                </span>
                <span className="cart-item-discount">
                  ({item.discount}% OFF)
                </span>
              </p>
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="remove-item"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart">Your cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Price Details</h3>
          <p>
            Original Price: <span>₹{totalOriginalPrice.toFixed(2)}</span>
          </p>
          <p>
            Discount: <span>-₹{totalDiscount.toFixed(2)}</span>
          </p>
          <h3>
            Total Payable: <span>₹{totalAmount.toFixed(2)}</span>
          </h3>
          <button>Buy now</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
