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
          </div>
        </div>
        <div className="navbar-bottom bg-regal-blue">
          <div className="container flex flex-between">
            <nav>
              <ul>
                <Link to="products"> Products</Link>
                <Link to="profile"> Profile</Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
