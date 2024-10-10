import React from 'react';

export const ClientAction = ({ logo: Logo, onClick, className = '', child }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-10 h-10 rounded-full bg-black border-none font-semibold flex items-center justify-center shadow-md cursor-pointer transition-all duration-300 overflow-hidden relative text-decoration-none hover:w-30 hover:rounded-lg ${className}`}
    >
      <Logo className="w-4 h-4 text-white transition-all duration-300 transform hover:rotate-360" />
      <span className="absolute left-0 px-3 text-white text-sm transition-all duration-300 opacity-0 hover:opacity-100">

      </span>
    </button>
  );
};
