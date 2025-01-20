// src/components/Navigation.js
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { handleLogout } = useContext(AuthContext);
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
          <NavLink to="/dashboard" className="text-white hover:text-gray-400">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/login" className="text-white hover:text-gray-400" end>
            <button onClick={handleLogout}>Logout</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
