"use client";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const items = [
  { name: "Inicio", url: "#Hero" },
  { name: "Galería", url: "#Galerie" },
  { name: "Precios", url: "#Prices" },
  { name: "Contacto", url: "#Contact" },
];

const NavBar = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-full bg-black flex items-center justify-between px-5 lg:h-[8vh]">
      <div className="flex items-center justify-between w-full lg:hidden hover:cursor-pointer">
        <div onClick={toggleSidebar}>
          <MenuIcon style={{ fontSize: "2em", color: "white" }} />
        </div>
        <div className="hover:cursor-pointer" onClick={() => router.push("/sign-in")}>
          <AccountCircleOutlinedIcon
            style={{ fontSize: "2em", color: "white" }} className="hover:cursor-pointer"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-fit w-3/4 max-w-xs bg-black transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="flex items-center justify-between p-5">
          <div className="text-white font-bold text-lg">Menú</div>
          <div onClick={toggleSidebar}>
            <CloseIcon style={{ fontSize: "2em", color: "white" }} />
          </div>
        </div>
        <ul className="flex flex-col gap-5 p-5">
          {items.map(({ name, url }, index) => (
            <li
              key={index}
              className="text-white tracking-widest-plus text-lg cursor-pointer"
              onClick={() => {
                router.push(url);
                setSidebarOpen(false);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <ul className="hidden lg:flex lg:flex-row lg:gap-7 lg:font-bold lg:font-inika lg:items-center">
        {items.map(({ name, url }, index) => (
          <li
            key={index}
            className="text-white tracking-widest-plus text-lg lg:text-base cursor-pointer"
            onClick={() => router.push(url)}
          >
            {name}
          </li>
        ))}
      </ul>

      <div
        className="hidden lg:flex"
        onClick={() => router.push("/sign-in")}
      >
        <AccountCircleOutlinedIcon
          style={{ fontSize: "2em", color: "white" }} className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NavBar;
