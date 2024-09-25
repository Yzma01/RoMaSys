import React from "react";
import PhoneChanger from "./PhoneChanger";

const FormInput = ({ value, placeholder, setValue }) => {
  return (
    <div className="relative w-full max-w-xs py-5 border-b-gray-200">
      <input
        type={
          placeholder == "Teléfono" ||
          placeholder == "Monto" ||
          placeholder == "cm" ||
          placeholder == "kg"
            ? "number"
            : "text"
        }
        className="peer w-full border-none border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-b-3 focus:border-gradient-to-r from-blue-800 to-cyan-400 transition-colors duration-200 py-2 "
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      {placeholder == "Teléfono" ? (
        <label
          htmlFor="name"
          className="absolute top-0 left-0 text-gray-500 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-cyan-400 transition-all duration-200 pl-2"
        >
          <div className="flex flex-row gap-1">
            <PhoneChanger placeholder={placeholder} />
            {placeholder}
          </div>
        </label>
      ) : (
        <label
          htmlFor="name"
          className="absolute top-0 left-0 text-gray-500 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-cyan-400 transition-all duration-200 pl-10"
        >
          {placeholder}
        </label>
      )}
      <svg
        width={
          placeholder == "Monto" || placeholder == "cm" || placeholder == "kg"
            ? "150"
            : "300"
        }
        height="10"
      >
        <line x1="0" y1="0" x2="300" y2="0" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default FormInput;
