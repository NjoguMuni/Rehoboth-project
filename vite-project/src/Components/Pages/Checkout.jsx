import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const placeholderImage = 'https://via.placeholder.com/100x100?text=No+Image';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields.');
      return;
    }

    // Generate WhatsApp message
    const orderDetails = cart
      .map(
        (item) =>
          `${item.title} (${item.variant?.color || 'No color'}) x ${item.quantity} - KSh ${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');
    const message = `New Order:\n\nCustomer: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nOrder:\n${orderDetails}\n\nTotal: KSh ${getCartTotal()}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '+254729344312';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Clear cart and redirect to WhatsApp
    clearCart();
    window.open(whatsappUrl, '_blank');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h1>Checkout</h1>
        <p>Your cart is empty. <Link to="/">Shop now</Link>.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2>Customer Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="whatsapp-button">
              Place Order via WhatsApp
            </button>
          </form>
        </div>
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.cartItemId} className="order-item">
                <img
                  src={item.variant?.image || item.image || placeholderImage}
                  alt={item.title}
                  className="order-item-image"
                  onError={(e) => (e.target.src = placeholderImage)}
                />
                <div className="order-item-details">
                  <h3>{item.title} {item.variant?.color ? `(${item.variant.color})` : ''}</h3>
                  <p>KSh {item.price.toFixed(2)} x {item.quantity}</p>
                  <p>Subtotal: KSh {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <h3>Total: KSh {getCartTotal()}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;