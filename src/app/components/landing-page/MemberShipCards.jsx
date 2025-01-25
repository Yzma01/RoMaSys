import React from "react";

const MemberShipCards = () => {
  const data = [
    { memberShip: "Dia", price: "3000" },
    { memberShip: "Quincena", price: "10,000" },
    { memberShip: "Mes", price: "20,000" },
  ];
  return (
    <div className="flex flex-col md:flex-row lg:flex-row lg:justify-center lg:gap-10 gap-3 m-5 pb-10">
      {data.map(({ memberShip, price }, index) => (
        <div
          className="w-full max-w-sm lg:max-w-lg p-6 lg:p-10 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          key={index}
        >
          <h5 className="mb-4 text-xl lg:text-2xl font-medium text-gray-500 dark:text-gray-400">
            {memberShip}
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl lg:text-4xl font-semibold">₡</span>
            <span className="text-5xl lg:text-6xl font-extrabold tracking-tight">
              {price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberShipCards;
