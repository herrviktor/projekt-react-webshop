import './nav.css'

import React from 'react';

const Nav = ({ cartItems, setShowCart }) => {
  const handleCartClick = () => {
    setShowCart(true);
  };

  return (
    <nav className="top-nav">
      <a className="link top-link" href="C:/Users/herrv/Documents/Projektarbete/index.html" target="_self">
        Home
      </a>
      <a href="C:/Users/herrv/Documents/Projektarbete/kassa.html" target="_self" className="checkout" onClick={handleCartClick}>
        Cart
        <span className="cart">
          &#x1F6D2;
          <svg className="logo-mini svg-cart" viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" />
            <text className="logo-text2" x="6" y="15" style={{ fontSize: '15px' }}>
              {cartItems.length}
            </text>
          </svg>
        </span>
      </a>
      <a className="link top-link" href="C:/Users/herrv/Documents/Projektarbete/kontakt.html" target="_self">
        Checkout
      </a>
    </nav>
  );
};

export default Nav;
