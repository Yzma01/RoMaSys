"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/app/components/ui/chart";
import FilterIncomingChart from "./FilterIncomingChart";
import FilterBar from "./FilterBar";

const chartData = [
  { date: "2024-04-01", incoming: 150 },
  { date: "2024-04-02", incoming: 180 },
  { date: "2024-04-03", incoming: 120 },
  { date: "2024-04-04", incoming: 260 },
  { date: "2024-04-05", incoming: 290 },
  { date: "2024-04-06", incoming: 340 },
  { date: "2024-04-07", incoming: 180 },
  { date: "2024-04-08", incoming: 320 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  incoming: {
    label: "Ingresos",
    color: "hsl(var(--chart-2))",
  },
};

export function IncomingChart() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [typeOfIncomming, settypeOfIncomming] = React.useState("")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="bg-blueDark border-none m-10">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left text-white">
          <CardTitle>Ingresos</CardTitle>
        </div>
       <FilterBar />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncoming" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-incoming)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-incoming)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="incoming"
              type="natural"
              fill="url(#fillIncoming)"
              stroke="var(--color-incoming)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent className={"text-white"}/>} />
          </AreaChart>
        </ChartContainer>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Ingresos según {`${typeOfIncomming}`}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
