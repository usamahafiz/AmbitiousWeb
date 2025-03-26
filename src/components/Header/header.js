import { useState } from "react";
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
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Our Services</a>
          <a href="#">Contact Us</a>
        </nav>

        {/* Right Section */}
        <div className="right-section">
        <button className="search-btn">
            <FaSearch className="search-icon" /> Search
          </button>
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
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Our Services</a>
          <a href="#">Contact Us</a>
          <button className="search-btn">Search Name</button>
          <button className="sign-in-btn">Sign In</button>
        </div>
      )}
    </header>
  );
}
