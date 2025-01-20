import React from "react";

const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  disabled,
  required = false,
}) => {
  const baseStyles =
    "border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return type === "textarea" ? (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      className={baseStyles}
      value={value}
      onChange={onChange}
    ></textarea>
  ) : (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={baseStyles}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default InputField;
