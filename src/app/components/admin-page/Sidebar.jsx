import React from "react";
import {logo} from "../../../../public/images/galerie/1.png"

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="bg-blueDark grid">
      <div className="flex justify-center items-center pb-3">
        <img src={logo} alt="logo" />
        <h2> Niger Fitnes Gym</h2>
      </div>
      <div >
        Home
      </div>
     
    </div>
  );
};
