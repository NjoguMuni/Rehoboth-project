import React, { useState, useCallback} from 'react'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import {debounce} from 'lodash'

import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import Contacts from './Components/Pages/Contacts'
import ProductDetails from './Components/Pages/ProductDetails'
import Cart from './Components/Pages/Cart'
import Checkout from './Components/Pages/Checkout'
import './App.css'


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );


  return (
    
    <div>
      <Navbar onSearch={handleSearch}/>
      
      <Routes>
        <Route index element={<Home searchQuery={searchQuery} />} />
        <Route path="/home" element={<Home searchQuery = {searchQuery}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
    

  )
}

export default App
