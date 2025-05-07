import React from 'react';
import { useCart } from '../../Context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, searchQuery }) => {
  const { addToCart } = useCart();

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  // Generate WhatsApp link
  const getWhatsAppLink = () => {
    const phoneNumber = '+254729344312';
    const message = `Hi, I'm interested in buying the ${product.title}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  // Fallback image
  const placeholderImage = 'https://via.placeholder.com/200x200?text=No+Image';

  // Add to cart with first variant (if available)
  const handleAddToCart = () => {
    const variant = product.variants?.[0] || null; // Use first variant or null
    addToCart(product, variant);
  };

  return (
    <div className="product-card">
      <img
        src={product.image || placeholderImage}
        alt={product.title}
        className="product-image"
        onError={(e) => (e.target.src = placeholderImage)}
      />
      <div className="product-details">
        <h3
          className="product-title"
          dangerouslySetInnerHTML={{ __html: highlightText(product.title) }}
        />
        <p className="product-price">KSh {product.price.toFixed(2)}</p>
        <p
          className="product-description"
          dangerouslySetInnerHTML={{ __html: highlightText(product.description) }}
        />
        <div className="button-group">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            Buy on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;