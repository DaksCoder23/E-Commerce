import React from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = ({ cart = [], setCart }) => {
  const cartItems = Array.isArray(cart) ? cart : [];

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + (item?.price || 0), 0);

  const removeFromCart = (id) => {
    if (!setCart) return;
    const newCart = cartItems.filter(item => item.id !== id);
    setCart(newCart);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          {cartItems.map((item,index) => (
            <div key={`${item.id}-${index}`} className="cart-item">
              <div className="cart-item-details">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h2 className="cart-item-title">{item.title}</h2>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="cart-item-remove"
                aria-label="Remove item"
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}
          
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </>
      )}

      {/* Always show Back to Products button */}
      <div className="cart-footer">
        <Link to="/products" className="back-to-products">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
};

export default Cart;
