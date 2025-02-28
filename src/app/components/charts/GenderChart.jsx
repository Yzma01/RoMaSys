"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/app/components/ui/chart";

//VISITORS SON LOS QUE CAMBIO CON LO DE JORGE
let chartData = [
  { gender: "masc", clients: 0, fill: "#60a5fa" },
  { gender: "fem", clients: 0, fill: "#f472b6" },
  { gender: "other", clients: 0, fill: "#c084fc" },
];

const chartConfig = {
  masc: {
    label: "Masculino",
    color: "#60a5fa",
  },
  fem: {
    label: "Femenino",
    color: "#f472b6",
  },
  other: {
    label: "Otro",
    color: "#c084fc",
  },
};

const clearData = ()=>{
  for (let index = 0; index < chartData.length; index++){
    chartData[index].clients = 0;
  }
}

const setData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    clearData();
    return chartData;
  }

  const updatedChartData = [...chartData];
  data.forEach(({ count, _id }) => {
    const id = _id.toLowerCase();
    if (id === "masculino") updatedChartData[0].clients = count;
    if (id === "femenino") updatedChartData[1].clients = count;
    if (id === "otro") updatedChartData[2].clients = count;
  });
  return updatedChartData;
};

const getTotalVisitors = (updatedData) => {
  return updatedData.reduce((acc, curr) => acc + curr.clients, 0);
};

export function GenderChart({ data }) {
  const updatedData = setData(data);
  const totalVisitors = getTotalVisitors(updatedData);

  return (
    <Card className="flex flex-col w-fit bg-blueDark border-none shadow-lg">
      <CardHeader className="items-center pb-0 text-white">
        <CardTitle>Género de los Clientes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={updatedData}
              dataKey="clients"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold"
                          style={{ fill: "#FFFFFF" }}
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Clientes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Clientes según el género
        </div>
      </CardFooter>
    </Card>
  );
}
