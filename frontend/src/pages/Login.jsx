import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signin } from "../services/authService";

import loginanimation from "../assets/images/loginanimation.gif";

import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const { handleSignin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before making the request

    try {
      const result = await handleSignin(email, password);
    //  console.log(result);
      if (result.success) {
        localStorage.setItem("token", result.token);

        navigate("/"); // Redirect to homepage after successful signin
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-100 flex-col-reverse sm:flex-row">
      <div className="w-full max-w-md p-8 bg-white-800 shadow-xl rounded-lg flex flex-col space-y-6 sm:w-3/4 md:w-1/2 lg:w-1/3">
        {/* Sign In Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black font-bold mb-4 m-4">Sign In</h2>
          <span className="text-sm bg-green-200 p-4 rounded-2xl text-black">
            <Link to="/">Homepage</Link>
          </span>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-black font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-black font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black sm:text-sm"
              required
            />
          </div>

          <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-black text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Second Section (Image) */}
      <div className="h-[200px] w-[250px] sm:h-[300px] sm:w-[350px] md:h-[400px] md:w-[500px] lg:h-[400px] lg:w-[500px] ml-8 mt-8 sm:mt-4 sm:ml-0 sm:p-8 sm:block">
        <img
          src={loginanimation}
          alt="animation"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
