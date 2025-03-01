"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/app/components/ui/chart";

let chartData = [
  { type: "with", clients: 0, fill: "#60a5fa" },
  { type: "without", clients: 0, fill: "#f472b6" },
];

const chartConfig = {
  with: {
    label: "Con Rutina",
    color: "#60a5fa",
  },
  without: {
    label: "Sin Rutina",
    color: "#f472b6",
  },
};

const clearData = ()=>{
  for (let index = 0; index < chartData.length; index++){
    chartData[index].clients = 0;
  }
}

const setData = (data) => {
  if (data && data.length === 0) {
    clearData();
    return chartData;
  }

  const updatedChartData = [...chartData];
  updatedChartData[0].clients = data? data.withRoutine: 0;
  updatedChartData[1].clients = data? data.withoutRoutine: 0;
  
  return updatedChartData;
};

const getTotalVisitors = (updatedData) => {
  return updatedData.reduce((acc, curr) => acc + curr.clients, 0);
};

export function RoutineChart({ data }) {
  const updatedData = setData(data);
  const totalVisitors = getTotalVisitors(updatedData);

  return (
    <Card className="flex flex-col w-fit bg-blueDark border-none shadow-lg">
      <CardHeader className="items-center pb-0 text-white">
        <CardTitle>Clientes Totales</CardTitle>
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
              nameKey="type"
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
                        {/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Clientes Totales
                        </tspan> */}
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
          Clientes totales con rutina y sin rutina
        </div>
      </CardFooter>
    </Card>
  );
}
