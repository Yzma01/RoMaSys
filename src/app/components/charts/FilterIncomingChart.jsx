import React, { useState } from "react";
import { Filter } from "../utils/Filter";
import { outlinedInputClasses } from "@mui/material";

const frameworks = [
  { value: "dia", label: "Dia" },
  { value: "quincena", label: "Quincena" },
  { value: "mes", label: "Mes" },
];

const FilterIncomingChart = ({
  filterSelected,
  setFilterSelected,
  handleFilter,
}) => {
  return (
    <div>
      <Filter
        searchClientsByFilter={()=>handleFilter}
        frameworks={frameworks}
        value={filterSelected}
        setValue={setFilterSelected}
        className={"w-40 bg-adminBackground h-10"}
        icon={true}
      />
    </div>
  );
};

export default FilterIncomingChart;
