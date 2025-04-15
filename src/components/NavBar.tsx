import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4 rounded-lg shadow-sm" style={{ gridArea: 'nav' }}>
      <h2 className="text-lg font-bold">Navigation</h2>
      <div className="flex gap-4 mt-2">
        <a href="/" className="text-blue-600 font-bold hover:underline">Home</a>
        <a href="/about" className="text-blue-600 font-bold hover:underline">About</a>
        <a href="/contact" className="text-blue-600 font-bold hover:underline">Contact</a>
      </div>
    </nav>
  );
};

export default NavBar;
