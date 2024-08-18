import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function LogOut() {
  return (
    <SignOutButton>
      <button className="flex items-center justify-center px-[20%]">
        <div className="rotate-180 ">
          <LogoutRoundedIcon />
        </div>
        <p>Salir</p>
      </button>
    </SignOutButton>
  );
}
