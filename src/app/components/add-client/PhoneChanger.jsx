
import React from "react";

const PhoneChanger = ({placeholder}) => {
  return (
    <div className="flex flex-row">
        <p className="pl-1 pr-1">{placeholder == "Teléfono"? '🇨🇷':'₡'}</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className={`group peer ring-0 bg-green-500  rounded-full outline-none duration-300 after:duration-300 w-10 h-5  shadow-md peer-checked:bg-blue-700  peer-focus:outline-none  after:content-[""] after:z-10 after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-3 after:w-3 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-5 peer-checked:after:content-[""] peer-hover:after:scale-95`}></div>
      </label>
        <p className="pl-1 pr-1">{placeholder == "Teléfono"?'🇵🇦':'$'}</p>
    </div>
  );
};

export default PhoneChanger;
