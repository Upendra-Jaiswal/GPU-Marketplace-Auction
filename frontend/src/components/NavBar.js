import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import Gpulogo from "../assets/landingpage/gpuloho.jpg";

const NavBar = () => {
  const { handleLogout, isAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Gpulogo} alt="gpu" className="h-10 w-10 rounded-2xl" />
          <Link to="/" className="text-2xl font-bold text-blue-400">
            GPU Auction
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink to="/" className="text-white hover:text-gray-400" end>
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/gpulistings"
              className="text-white hover:text-gray-400"
            >
              Browse GPUs
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/gpulistings" className="text-white hover:text-gray-400">
              Live Auctions
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/sell" className="text-white hover:text-gray-400">
              Sell GPU
            </NavLink>
          </li> */}

          {isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/addgpu"
                  className="text-white hover:text-gray-400"
                >
                  Sell GPU
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className="text-white hover:text-gray-400"
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}

          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="flex flex-col mt-4 space-y-2 md:hidden">
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse" onClick={() => setIsOpen(false)}>
              Browse GPUs
            </NavLink>
          </li>
          <li>
            <NavLink to="/auctions" onClick={() => setIsOpen(false)}>
              Live Auctions
            </NavLink>
          </li>
          <li>
            <NavLink to="/sell" onClick={() => setIsOpen(false)}>
              Sell GPU
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/addgpu" onClick={() => setIsOpen(false)}>
                  Add GPU
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </NavLink>
              </li>
            </>
          )}

          <li>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 w-full"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
