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
const chartData = [
  { gender: "masc", clients: 275, fill: "#60a5fa" },
  { gender: "fem", clients: 200, fill: "#f472b6" },
  { gender: "other", clients: 287, fill: "#c084fc" },
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

export function GenderChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.clients, 0);
  }, []);

  return (
    <Card className="flex flex-col w-fit bg-blueDark border-none shadow-lg ml-10 mt-10">
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
              data={chartData}
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
