import React from 'react';

function Navbar({ setShowAddForm }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-gem">💎</span>
        <h1>GemMarket</h1>
      </div>
      <div className="nav-links">
        <button onClick={() => setShowAddForm(false)}>Browse</button>
        <button onClick={() => setShowAddForm(true)}>Sell a Gemstone</button>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;