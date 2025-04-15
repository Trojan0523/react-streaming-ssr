import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav>
      <h2>Navigation</h2>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;
