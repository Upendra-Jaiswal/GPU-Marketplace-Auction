import React from "react";

const Button = ({
  onClick,
  children,
  className,
  disabled,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg shadow-lg transition-all duration-200 ease-in-out focus:outline-none ${
        disabled
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
