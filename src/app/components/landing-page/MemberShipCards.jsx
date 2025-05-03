import React from "react";

const MemberShipCards = () => {
  const items = [
    {
      title: "Día",
      description: " ₡ 3000",
    },
    {
      title: "Quincena",
      description: " ₡ 12000",
    },
    {
      title: "Mes",
      description: " ₡ 20000",
    },
  ];

    return (
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center mx-3 lg:gap-10 gap-3 m-5 pb-10 mt-8">
          {items.map(({ title, description }, index) => (
            <div
              key={index}
              className="h-auto w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] flex flex-col items-center justify-center text-center p-4 border rounded-tr-[1rem] -translate-y-24 rounded-bl-[1rem] m-3 bg-white shadow-gray-400 shadow-lg gap-5"
            >
              <h1
                className={`font-inknut font-bold text-xl sm:text-2xl md:text-4xl ${
                  index === 1 ? "text-black" : "text-red"
                }`}
              >
                {title}
              </h1>
              <p className="text-wrap text-5xl font-inter text-text-gray">
                {description}
              </p>
            </div>
          ))}
        </div>
      
    );
  
};

export default MemberShipCards;
