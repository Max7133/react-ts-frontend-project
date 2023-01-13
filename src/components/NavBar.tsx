import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/style.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">Random</span>
              <span className="text-gold">Store</span>
            </Link>
            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <span className="btn-ico">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <div className="btn-txt fw-5">
                  Cart
                  <span className="cart-count-value"></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <nav>
              <ul>
                <Link to=""> Home Page</Link>
                <Link to="cart"> Checkout Page</Link>
                <Link to="products"> Products Page</Link>
                <Link to="profile"> Profile Page</Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
