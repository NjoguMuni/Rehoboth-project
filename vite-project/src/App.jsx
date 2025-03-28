import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import Contacts from './Components/Pages/Contacts'
import Portfolio from './Components/Pages/Portfolio'

const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Navbar />
      
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/portfolio" element={<Portfolio />} />

      </Routes>
    </div>
    </BrowserRouter>

  )
}

export default App
