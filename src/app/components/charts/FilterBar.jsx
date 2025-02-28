"use client";
import React, { useState } from "react";
import FilterIncomingChart from "./FilterIncomingChart";
import { DatePickerWithRange } from "../ui/DateSelector";

const FilterBar = ({
  date,
  setDate,
  filterSelected,
  setFilterSelected,
  handleFilter,
}) => {
  return (
    <div className="flex flex-row border border-gray-500 bg-adminBackground">
      <DatePickerWithRange
        className={"text-gray-300 font-bold"}
        date={date}
        setDate={setDate}
      />

      <FilterIncomingChart
        filterSelected={filterSelected}
        setFilterSelected={setFilterSelected}
        handleFilter={() => handleFilter}
      />
    </div>
  );
};

export default FilterBar;
