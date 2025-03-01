"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  incoming: {
    label: "Ingresos",
    color: "hsl(var(--chart-2))",
  },
};

const setData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const updatedChartData = data.reverse().map(({ total, _id }) => {
    const date = new Date(_id.date + "T00:00:00");
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );

    return {
      date: localDate.toISOString().split("T")[0],
      incoming: total,
    };
  });
  return updatedChartData;
};

const getDateFixed = (value) => {
  const date = new Date(value + "T00:00:00-06:00"); // Costa Rica (UTC-6)
  return date.toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
    timeZone: "America/Costa_Rica",
  });
};

export function IncomingChart({
  data,
  date,
  setDate,
  filterSelected,
  setFilterSelected,
  handleFilter,
}) {
  const [typeOfIncomming, settypeOfIncomming] = React.useState("");
  const updatedData = setData(data);

  return (
    <Card className="bg-blueDark border-none m-10">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left text-white">
          <CardTitle>Ingresos</CardTitle>
        </div>
        <FilterBar
          date={date}
          setDate={setDate}
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
          handleFilter={() => handleFilter}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={updatedData}>
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
            <YAxis domain={[0, "auto"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => getDateFixed(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => getDateFixed(value)}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="incoming"
              type="natural"
              fill="url(#fillIncoming)"
              stroke="var(--color-incoming)"
              stackId={undefined}
            />
            <ChartLegend
              content={<ChartLegendContent className={"text-white"} />}
            />
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
