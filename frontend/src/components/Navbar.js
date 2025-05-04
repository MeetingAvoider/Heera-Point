import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import "./Navbar.css"; // Ensure your CSS file is linked

function NavBar() {
  let history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // State for dropdown visibility
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // login reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // Get cart count from state
  const cart = useSelector((state) => state.cartReducer);
  const cartCount = cart?.cartItems?.length || 0;

  // logout
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdown") &&
        !e.target.closest(".user-dropdown")
      ) {
        setIsCategoriesOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsCategoriesOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  // Check if current page matches the link for active styling
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Updated categories with proper ID mapping
  const categories = [
    { name: "Chargers & Cables", id: "chargers_cables" },
    { name: "Audio Accessories", id: "audio_accessories" },
    { name: "Phone Cases & Covers", id: "phone_cases" },
    { name: "Screen Protection", id: "screen_protection" },
    { name: "Car Accessories", id: "car_accessories" },
    { name: "Smart Gadgets", id: "smart_gadgets" },
    { name: "Camera Lenses & Enhancers", id: "camera_lenses" },
    { name: "Cleaning & Maintenance", id: "cleaning_maintenance" },
    { name: "Power Banks & Batteries", id: "power_banks" },
    { name: "Adapters & Converters", id: "adapters_converters" },
  ];

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    history.push(`/products?category=${categoryId}`);
    // Close the dropdown after navigating
    setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 100);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <Link to="/home" className="brand-link">
            <span className="brand-name">Heera Cell Point</span>
            <span className="brand-tagline">Tech Accessories</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="main-navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActive("/")} ${isActive("/home")}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className={`nav-link ${isActive("/products")}`}
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/smart-search"
                className={`nav-link ${isActive("/smart-search")}`}
              >
                <i className="fas fa-brain me-1"></i> Smart Search
              </Link>
            </li>

            <li
              className="nav-item dropdown"
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoriesOpen(!isCategoriesOpen);
              }}
            >
              <span
                className={`dropdown-toggle ${isCategoriesOpen ? "open" : ""}`}
              >
                Categories
                <svg className="dropdown-arrow" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </span>
              {isCategoriesOpen && (
                <div
                  className="dropdown-menu show"
                  onClick={(e) => e.stopPropagation()}
                >
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${isActive("/about")}`}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${isActive("/contact")}`}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/chat-support"
                className={`nav-link ${isActive("/chat-support")}`}
              >
                Live Chat
              </Link>
            </li>
            {/* Admin Link */}
            {userInfo && userInfo.admin && (
              <li className="nav-item">
                <Link
                  to="/new-product"
                  className={`nav-link ${isActive("/new-product")}`}
                >
                  Add Product
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* User Actions (without search bar) */}
        <div className="navbar-actions">
          {userInfo ? (
            <div
              className="user-dropdown"
              onClick={(e) => {
                e.stopPropagation();
                setIsUserDropdownOpen(!isUserDropdownOpen);
              }}
            >
              <div className="user-dropdown-toggle">
                <div className="user-avatar">
                  {userInfo.username.charAt(0).toUpperCase()}
                </div>
                <span className="username">{userInfo.username}</span>
                <svg className="dropdown-arrow" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
              {isUserDropdownOpen && (
                <div
                  className="user-dropdown-menu show" // Added 'show' class for initial visibility if needed for testing
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link to="/account" className="dropdown-item">
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    My Account
                  </Link>
                  <Link to="/stripe-card-details" className="dropdown-item">
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                    </svg>
                    Payment Cards
                  </Link>
                  <Link to="/all-addresses" className="dropdown-item">
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    My Addresses
                  </Link>
                  <Link to="/all-orders" className="dropdown-item">
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                    </svg>
                    My Orders
                  </Link>
                  <Link to="/chat-support" className="dropdown-item">
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                    </svg>
                    Live Chat
                  </Link>
                  <button onClick={logoutHandler} className="logout-btn">
                    <svg className="dropdown-icon" viewBox="0 0 24 24">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <svg className="login-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
              Login
            </Link>
          )}

          {userInfo && (
            <Link to="/cart" className="cart-icon">
              <svg className="cart-svg" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-counter">{cartCount}</span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
