import React, { useState } from "react";

const HasRutine = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="checkbox-wrapper flex items-center">
      <input
        id="terms-checkbox-37"
        name="checkbox"
        type="checkbox"
        className="hidden"
        onChange={() => setChecked(!checked)}
      />
      <label className="terms-label cursor-pointer flex items-center" htmlFor="terms-checkbox-37">
        <span className="label-text ml-2 text-white pr-2">Rutina</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          className="checkbox-svg w-8 h-8 transition-transform duration-300"
        >
          <mask fill="white" id="path-1-inside-1_476_5-37">
            <rect height="200" width="200"></rect>
          </mask>
          <rect
            mask="url(#path-1-inside-1_476_5-37)"
            strokeWidth="40"
            className={`checkbox-box transition-all duration-300 ease-in ${checked ? 'stroke-8c00ff fill-transparent' : 'stroke-transparent fill-[#ffffffb0]'}`}
            height="200"
            width="200"
          ></rect>
          <path
            strokeWidth="15"
            d="M52 111.018L76.9867 136L149 64"
            className={`checkbox-tick transition-all duration-300 ease-in ${checked ? 'stroke-8c00ff stroke-dashoffset-0' : 'stroke-8c00ff stroke-dasharray-172 stroke-dashoffset-172'}`}
          ></path>
        </svg>
      </label>
    </div>
  );
};

export default HasRutine;
