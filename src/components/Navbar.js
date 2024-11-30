import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#333' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>
        Home
      </Link>
      <Link to="/create" style={{ color: '#fff' }}>
        Create Invoice
      </Link>
    </nav>
  );
}

export default Navbar;
