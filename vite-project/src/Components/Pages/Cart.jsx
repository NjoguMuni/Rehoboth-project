import React from 'react';
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const placeholderImage = 'https://via.placeholder.com/100x100?text=No+Image';

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty. <Link to="/">Shop now</Link>.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.cartItemId} className="cart-item">
            <img
              src={item.variant?.image || item.image || placeholderImage}
              alt={item.title}
              className="cart-item-image"
              onError={(e) => (e.target.src = placeholderImage)}
            />
            <div className="cart-item-details">
              <h3>{item.title} {item.variant?.color ? `(${item.variant.color})` : ''}</h3>
              <p>KSh {item.price.toFixed(2)} x {item.quantity}</p>
              <p>Subtotal: KSh {(item.price * item.quantity).toFixed(2)}</p>
              <div className="quantity-control">
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.cartItemId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: KSh {getCartTotal()}</h2>
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;