import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'; // Imports NavLink



const Navbar = () => {
  return (
    <header className="header">
        <a href="/" className="logo">Logo</a>
        

        <nav className="navbar">

            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>Portfolio</NavLink>
            <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>Contacts</NavLink>
   
        </nav>
    </header>
  )
}

export default Navbar
