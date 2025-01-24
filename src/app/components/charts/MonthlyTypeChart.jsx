"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

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
const chartData = [
  { monthlyType: "Dia", clients: 0, fill: "#e23670" },
  { monthlyType: "Quincena", clients: 0, fill: "#2662d9" },
  { monthlyType: "Mes", clients: 0, fill: "#af57db" },
];

const chartConfig = {
  Dia: {
    label: "Dia",
    color: "#FFFFFF",
  },
  Quincena: {
    label: "Quincena",
    color: "#FFFFFF",
  },
  Mes: {
    label: "Mes",
    color: "#FFFFFF",
  }
};

const DescriptionLabel = ({data}) => {
  return (
    <div className="tooltip-content bg-white w-32 rounded-lg p-[5px]">
      <div className="flex items-center">
        <div
          className="w-3 h-3 mr-2 rounded"
          style={{ backgroundColor: data.fill }}
        ></div>
        <p className="flex-1 justify-between flex">{data.monthlyType}</p>
        <p className="pr-2"> {data.clients}</p>
      </div>
    </div>
  );
};

const CustomTick = ({ x, y, payload }) => {
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={15}
        fontWeight="bold"
      >
        {payload.value}
      </text>
    );
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
      if (id === "dia") updatedChartData[0].clients = count;
      if (id === "quincena") updatedChartData[1].clients = count;
      if (id === "mes") updatedChartData[2].clients = count;
    });
    return updatedChartData;
  };

export function MonthlyTypeChart({data}) {
  console.log(data);
  const updatedData = setData(data);
  return (
    <Card className="w-fit bg-blueDark border-none shadow-lg">
      <CardHeader className="items-center text-white pb-10">
        <CardTitle>Tipos de Mensualidades</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={updatedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="monthlyType"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
              tick={<CustomTick />}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return <DescriptionLabel data={data}/>;
                }
                return null;
              }}
            />
            <Bar
              dataKey="clients"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Clientes según el tipo de Mensualidad
        </div>
      </CardFooter>
    </Card>
  );
}
