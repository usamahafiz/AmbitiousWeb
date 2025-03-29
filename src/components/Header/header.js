import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegBell, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import "../../assets/css/header.css";
import logo from "../../assets/images/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Logo & Website Name */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <span className="site-name">Ambitious</span>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/* <Link to="/services">Our Services</Link> */}
          <Link to="/contact">Contact Us</Link>
        </nav>

        {/* Right Section */}
        <div className="right-section">
          {/* <button className="search-btn">
            <FaSearch className="search-icon" /> Search
          </button> */}
          <button className="sign-in-btn">Sign Up</button>
          <FaRegBell className="bell-icon" />
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/contact">Contact Us</Link>
          <button className="search-btn">Search</button>
          <button className="sign-in-btn">Sign In</button>
        </div>
      )}
    </header>
  );
}
