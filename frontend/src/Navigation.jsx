// src/components/Navigation.js

import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="text-white hover:text-gray-400" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="text-white hover:text-gray-400">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className="text-white hover:text-gray-400">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/addgpu" className="text-white hover:text-gray-400">
            Add GPU
          </NavLink>
        </li>
        <li>
          <NavLink to="/editgpu" className="text-white hover:text-gray-400">
            Edit GPU
          </NavLink>
        </li>
        <li>
          <NavLink to="/placebid" className="text-white hover:text-gray-400">
            Place Bid
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
