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

const setData = (data) => {
  if (!Array.isArray(data)) {
    return chartData;
  }
  const updatedChartData = [...chartData];
  data.forEach(({ count, month }, index) => {
    updatedChartData[index].clients = count;
    updatedChartData[index].month = month;
  });
  const lastThreeUpdated = updatedChartData.slice(-3);
  return lastThreeUpdated;
};

export function NewClientsMonthlyChart({ data }) {
  const updatedData = setData(data);
  console.log(data);
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
