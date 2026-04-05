"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type {
  PieSectorDataItem,
  PieSectorShapeProps,
} from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive pie chart";

const PIE_COLORS = [
  "#222222",
  "#444444",
  "#666666",
  "#888888",
  "#AAAAAA",
  "#CCCCCC",
  "#E5E5E5",
  "#F5F5F5",
];

export function ChartPieInteractive({
  data,
}: {
  data: { channel: string; value: number }[];
}) {
  const id = "pie-interactive";
  const [activeIndex, setActiveIndex] = React.useState(0);
  const channels = data.map(item => item.channel);
  // Build chartConfig dynamically for legend/colors
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    channels.forEach((ch, idx) => {
      config[ch] = {
        label: ch,
        color: PIE_COLORS[idx % PIE_COLORS.length],
      };
    });
    return config;
  }, [channels]);

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        );
      }
      return <Sector {...props} outerRadius={outerRadius} />;
    },
    [activeIndex],
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>Distribusi Revenue per Channel</CardDescription>
        </div>
        <Select
          value={channels[activeIndex]}
          onValueChange={val => setActiveIndex(channels.indexOf(val))}
        >
          <SelectTrigger
            className="ml-auto h-7 w-32.5 rounded-lg pl-2.5"
            aria-label="Select channel"
          >
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {channels.map((ch, idx) => (
              <SelectItem key={ch} value={ch} className="rounded-lg">
                {ch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-75"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data.map((d, idx) => ({
                ...d,
                fill: PIE_COLORS[idx % PIE_COLORS.length],
              }))}
              dataKey="value"
              nameKey="channel"
              innerRadius={60}
              strokeWidth={5}
              shape={renderPieShape}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[activeIndex].value.toLocaleString("id-ID")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Revenue
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
    </Card>
  );
}
