import Image from "next/image";
import React from "react";

const RoundButton = ({ image, onClick }) => {
  return (
    <button className="pl-3 pr-3" onClick={onClick}>
      <Image
        src={image}
        alt={`${onClick != null ? "check" : "exit"}`}
        width={50}
        height={50}
      />
    </button>
  );
};

export default RoundButton;
