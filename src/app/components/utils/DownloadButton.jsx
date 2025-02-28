import React, { useState, useEffect } from "react";
import "./DownloadButton.css";

const DownloadButton = ({ onClick }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      const timer = setTimeout(() => setChecked(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [checked]);

  const handleClick = (e) => {
    e.stopPropagation(); // Evita la propagación del evento
    if (!checked) {
      setChecked(true);
      onClick && onClick(); // Solo llama a `onClick` una vez
    }
  };

  return (
    <div className="container">
      <label className="label">
        <input
          type="checkbox"
          className="input"
          checked={checked}
          onChange={handleClick} // Mueve onClick aquí
        />
        <span className="circle">
          <svg
            className="icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            ></path>
          </svg>
          <div className="square"></div>
        </span>
        <p className="title">Descargar</p>
        <p className="title">Open</p>
      </label>
    </div>
  );
};

export default DownloadButton;
