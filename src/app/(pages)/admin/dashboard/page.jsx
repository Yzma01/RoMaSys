import React from "react";
import { SignOutButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="bg-black">
      Hola Reds
      <div className="bg-red-700">
        <SignOutButton />
      </div>
    </div>
  );
}
