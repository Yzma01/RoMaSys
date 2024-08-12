"use client";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/navigation";

const items = [
  { name: "Inicio", url: "" },
  { name: "Galería", url: "" },
  { name: "Precios", url: "" },
  { name: "Contacto", url: "" },
];

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[5vh] bg-black flex items-center justify-between px-5">
      <ul className="flex flex-row gap-7 font-bold font-inika items-center">
        {items.map(({ name }, index) => (
          <li key={index} className="text-white tracking-widest-plus text-lg">
            {name}
          </li>
        ))}
      </ul>
      <div onClick={() => router.push("/sign-in")}>
        <AccountCircleOutlinedIcon
          style={{ fontSize: "2em", color: "white" }}
        />
      </div>
    </div>
  );
};

export default NavBar;
