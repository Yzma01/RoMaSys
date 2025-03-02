'use client'
import React, { useState } from "react";
import { Filter } from "../utils/Filter";

const frameworks = [
  {
    value: "dia",
    label: "Dia",
  },
  {
    value: "quincena",
    label: "Quincena",
  },
  {
    value: "mes",
    label: "Mes",
  },
  {
    value: "vencido",
    label: "Vencidos",
  },
  {
    value: 'congelado',
    label: 'Congelados'
  }
];
const SearchBar = ({ searchClientsByFilter, searchByNameOrId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center justify-center h-10 bg-transparent rounded-lg overflow-hidden cursor-pointer pl-4 shadow-md border border-gray-3">
      <input
        type="text"
        name="text"
        className="w-full h-full border-none outline-none text-sm caret-gray-3 bg-transparent"
        id="input"
        value={searchValue}
        onChange={(e) => {
          searchByNameOrId(e.target.value);
          setSearchValue(e.target.value);
        }}
        placeholder="Buscar"
      />

      <label htmlFor="input" className="cursor-text px-3">
        <svg
          viewBox="0 0 512 512"
          className="w-[13px] cursor-pointer"
          onClick={() => searchByNameOrId(searchValue)}
        >
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            className="fill-gray-500"
          ></path>
        </svg>
      </label>

      <div className="h-[40%] w-[1.3px] bg-gray-500"></div>

      <Filter
        searchClientsByFilter={searchClientsByFilter}
        frameworks={frameworks}
        icon={true}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default SearchBar;
