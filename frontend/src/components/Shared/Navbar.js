import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">Newsletter App</Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/newsletters">Newsletters</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/recipients">Recipients</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;