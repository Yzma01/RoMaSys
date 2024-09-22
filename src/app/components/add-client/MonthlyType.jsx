import React from "react";

const monthlyType = [
  {
    type: "Dia",
  },
  {
    type: "Quincena",
  },
  {
    type: "Mes",
  },
];

const MonthlyType = ({ setValue, value }) => {
  return (
    <div className="flex flex-col gap-2">
      {monthlyType.map(({ type }, index) => (
        <label
          key={index}
          className="flex items-center gap-3 relative cursor-pointer w-40 h-12"
        >
          <input
            type="radio"
            id={type}
            name="value-radio"
            onChange={(e) => setValue(e.target.value)}
            checked={value === type}
            value={type}
            className="appearance-none w-4 h-4 rounded-full bg-gray-800 focus:outline-none cursor-pointer relative"
            required
          />
          <div className={`absolute w-full h-full rounded-lg transition-all duration-300 ease-in-out 
              bg-transparent border-2 border-transparent 
              hover:bg-[rgba(66,153,225,0.5)] 
              ${value === type ? "bg-[rgba(66,153,225,0.5)] border-blue-500" : ""}
            `}></div>
          <div className={`absolute w-4 h-4 rounded-full bg-blue-500 transition-all duration-200 
              ${value === type ? "scale-100" : "scale-0"} 
              flex items-center justify-center
            `}>
            <div className={`w-2 h-2 rounded-full bg-white transition-all duration-200 
                ${value === type ? "scale-100" : "scale-0"}
              `}></div>
          </div>
          <p className="text-white z-10">{type}</p>
        </label>
      ))}
    </div>
  );
};

export default MonthlyType;
