// Button.jsx
import React from "react";

const Button = ({ text, onClick, color = "green" }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-${color}-500`}
    >
      <span
        className={`font-bold text-white text-xl relative z-10 group-hover:text-${color}-500 duration-500`}
      >
        {text}
      </span>
      <span
        className={`absolute top-0 left-0 w-full bg-${color}-500 duration-500 group-hover:-translate-x-full h-full`}
      />
      <span
        className={`absolute top-0 left-0 w-full bg-${color}-500 duration-500 group-hover:translate-x-full h-full`}
      />
      <span
        className={`absolute top-0 left-0 w-full bg-${color}-500 duration-500 delay-300 group-hover:-translate-y-full h-full`}
      />
      <span
        className={`absolute delay-300 top-0 left-0 w-full bg-${color}-500 duration-500 group-hover:translate-y-full h-full`}
      />
    </button>
  );
};

export default Button;
