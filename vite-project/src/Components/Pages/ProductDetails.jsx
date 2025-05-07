import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import './ProductDetails.css';

// Placeholder images
const placeholderImage ='https://via.placeholder.com/400x400?text=No+Image';
const variantImage1 = 'https://via.placeholder.com/60x60?text=Black';
const variantImage2 = 'https://via.placeholder.com/60x60?text=White';
const variantImage3 = 'https://via.placeholder.com/60x60?text=Blue';
const variantImage4 = 'https://via.placeholder.com/60x60?text=Red';

const products = [
  {
    id: 1,
    title: 'iPhone 11',
    price: 48000,
    description: '128 GB Non Active',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'White', image: variantImage2 },
      { color: 'Blue', image: variantImage3 },
    ],
  },
  {
    id: 2,
    title: 'iPhone 12',
    price: 59000,
    description: '128 GB Non Active',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'White', image: variantImage2 },
      { color: 'Red', image: variantImage4 },
    ],
  },
  {
    id: 3,
    title: 'iPhone 13',
    price: 64500,
    description: '128 GB Non Active',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'Blue', image: variantImage3 },
      { color: 'Red', image: variantImage4 },
    ],
  },
  {
    id: 4,
    title: 'iPhone 14',
    price: 78000,
    description: '128 GB 2 yrs warranty',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'White', image: variantImage2 },
      { color: 'Blue', image: variantImage3 },
    ],
  },
  {
    id: 5,
    title: 'iPhone 14 Pro',
    price: 85000,
    description: '256 GB 2 yrs warranty',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'White', image: variantImage2 },
      { color: 'Red', image: variantImage4 },
    ],
  },
  {
    id: 6,
    title: 'iPhone 14 Pro Max',
    price: 95000,
    description: '256 GB 2 yrs warranty',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'Blue', image: variantImage3 },
      { color: 'Red', image: variantImage4 },
    ],
  },
  {
    id: 7,
    title: 'iPhone 14 Plus',
    price: 82000,
    description: '128 GB 2 yrs warranty',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'White', image: variantImage2 },
      { color: 'Blue', image: variantImage3 },
    ],
  },
  {
    id: 8,
    title: 'iPhone 15',
    price: 90000,
    description: '128 GB 2 yrs warranty',
    image: placeholderImage,
    variants: [
      { color: 'Black', image: variantImage1 },
      { color: 'White', image: variantImage2 },
      { color: 'Red', image: variantImage4 },
    ],
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(product, selectedVariant);
    }
  };

  // Generate WhatsApp link
  const getWhatsAppLink = () => {
    const phoneNumber = '+254729344312';
    const message = `Hi, I'm interested in buying the ${product.title}${
      selectedVariant ? ` (${selectedVariant.color})` : ''
    }. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-image-section">
          <img
            src={selectedVariant?.image || product.image}
            alt={`${product.title}${selectedVariant ? ` ${selectedVariant.color}` : ''}`}
            className="product-details-image"
            onError={(e) => (e.target.src = placeholderImage)}
          />
          <div className="variant-images">
            {product.variants.map((variant) => (
              <img
                key={variant.color}
                src={variant.image}
                alt={`${product.title} ${variant.color}`}
                className={`variant-image ${selectedVariant?.color === variant.color ? 'selected' : ''}`}
                onClick={() => handleVariantChange(variant)}
                onError={(e) => (e.target.src = placeholderImage)}
              />
            ))}
          </div>
        </div>
        <div className="product-info-section">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-price">KSh {product.price.toFixed(2)}</p>
          <p className="product-details-description">{product.description}</p>
          <div className="variant-selector">
            <h3>Color: {selectedVariant?.color || 'Select a color'}</h3>
            <div className="variant-options">
              {product.variants.map((variant) => (
                <button
                  key={variant.color}
                  className={`variant-button ${selectedVariant?.color === variant.color ? 'selected' : ''}`}
                  onClick={() => handleVariantChange(variant)}
                >
                  {variant.color}
                </button>
              ))}
            </div>
          </div>
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
    </div>
  );
};

export default ProductDetails;