import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Fuse from 'fuse.js';
import ProductCard from '../Card/ProductCard';
import './Home.css';

// Import images
import productImage1 from '../../assets/Images/product1.jpg';
import productImage2 from '../../assets/Images/product2.jpg';
import productImage3 from '../../assets/Images/product3.jpg';
import productImage4 from '../../assets/Images/product4.jpg';
import Banner1 from '../../assets/Images/banner1.jpg';
import Banner2 from '../../assets/Images/banner2.jpg';
import Banner3 from '../../assets/Images/banner3.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Home = ({ searchQuery }) => {
  const products = [
    {
      id: 1,
      title: 'iPhone 11',
      price: 48000,
      description: '128 GB Non Active',
      image: productImage1,
    },
    {
      id: 2,
      title: 'iPhone 12',
      price: 59000,
      description: '128 GB Non Active',
      image: productImage2,
    },
    {
      id: 3,
      title: 'iPhone 13',
      price: 64500,
      description: '128 GB Non Active',
      image: productImage3,
    },
    {
      id: 4,
      title: 'iPhone 14',
      price: 78000,
      description: '128 GB 2 yrs warranty',
      image: productImage4,
    },
    {
      id: 5,
      title: 'iPhone 14 Pro',
      price: 85000,
      description: '256 GB 2 yrs warranty',
      image: productImage4,
    },
    {
      id: 6,
      title: 'iPhone 14 Pro Max',
      price: 95000,
      description: '256 GB 2 yrs warranty',
      image: productImage4,
    },
    {
      id: 7,
      title: 'iPhone 14 Plus',
      price: 82000,
      description: '128 GB 2 yrs warranty',
      image: productImage4,
    },
    {
      id: 8,
      title: 'iPhone 15',
      price: 90000,
      description: '128 GB 2 yrs warranty',
      image: productImage4,
    },
  ];

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    // Handle price-based search (e.g., "50000", "<60000", ">70000")
    const priceMatch = searchQuery.match(/^([<>]?)(\d+)$/);
    if (priceMatch) {
      const operator = priceMatch[1];
      const priceValue = parseFloat(priceMatch[2]);
      return products.filter((product) => {
        if (operator === '<') return product.price <= priceValue;
        if (operator === '>') return product.price >= priceValue;
        return product.price.toString().includes(priceValue.toString());
      });
    }

    // Fuzzy search for title and description
    const fuse = new Fuse(products, {
      keys: ['title', 'description'],
      threshold: 0.4, // Lower = stricter
      ignoreLocation: true,
    });
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, products]);

  const banners = [
    { id: 1, image: Banner1, alt: 'Banner 1' },
    { id: 2, image: Banner2, alt: 'Banner 2' },
    { id: 3, image: Banner3, alt: 'Banner 3' },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to Our Store</h1>
      <section className="banner-slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img src={banner.image} alt={banner.alt} className="banner-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="products-section">
        <div>
          <h2>Our Products</h2>
          {filteredProducts.length === 0 ? (
            <p className="no-results">No products found.</p>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <NavLink key={product.id} to={`/product/${product.id}`} className="product-link">
                  <ProductCard product={product} searchQuery={searchQuery} />
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;