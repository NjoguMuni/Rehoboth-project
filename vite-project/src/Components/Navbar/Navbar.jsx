import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../Context/CartContext';
import './Navbar.css';

  const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart(); 
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); 

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        Logo
      </NavLink>

      <div className="search-container">
        <div className="search-bar">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button type="button" className="clear-button" onClick={clearSearch}>
                <FaTimes />
              </button>
            )}
            <button type="button" className="search-button" onClick={() => onSearch(searchQuery)}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
          Portfolio
        </NavLink>
        <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>
          Contacts
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : 'cart-link')}>
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cartItemCount}</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;