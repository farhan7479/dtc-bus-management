import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/buses" className="hover:text-gray-400">Bus Management</Link>
        </li>
        <li>
          <Link to="/crews" className="hover:text-gray-400">Crew Management</Link>
        </li>
        <li>
          <Link to="/duties" className="hover:text-gray-400">Duty Management</Link>
        </li>
        <li>
          <Link to="/routes" className="hover:text-gray-400">Route Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
