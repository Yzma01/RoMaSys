"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
  { month: "", clients: 0 },
  { month: "", clients: 0 },
  { month: "", clients: 0 },
];

const chartConfig = {
  clients: {
    label: "Clientes",
    color: "#2662d9",
  },
  label: {
    color: "#FFFFFF",
  },
};

const clearData = ()=>{
  for (let index = 0; index < chartData.length; index++){
    chartData[index].month = "";
    chartData[index].clients = 0;
  }
}

const setData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    clearData()
    return chartData;
  }

  const updatedChartData = [...chartData];
  const lastThreeData = data.slice(-3);
  lastThreeData.forEach(({ count, month }, index) => {
    updatedChartData[index].clients = count;
    updatedChartData[index].month = month;
  });
  return updatedChartData;
};

export function NewClientsMonthlyChart({ data }) {
  const updatedData = setData(data);
  return (
    <Card className="bg-blueDark border-none">
      <CardHeader className="items-center text-white pb-10">
        <CardTitle>Nuevos Clientes Mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="clients" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="clients" layout="vertical" fill="#2662d9" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="clients"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Cantidad de nuevos Clientes por mes
        </div>
      </CardFooter>
    </Card>
  );
}
