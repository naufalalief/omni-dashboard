"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

const AREA_COLORS = [
  '#222222',
  '#444444',
  '#666666',
  '#888888',
  '#AAAAAA',
  '#CCCCCC',
  '#E5E5E5',
  '#F5F5F5',
];
const getChannelColor = (idx: number) => AREA_COLORS[idx % AREA_COLORS.length];

type ChannelAreaChartData = { date: string } & { [channel: string]: number };

export function ChartAreaInteractive({
  data,
  channels,
}: {
  data: ChannelAreaChartData[];
  channels: string[];
}) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    channels.forEach((ch, idx) => {
      config[ch] = {
        label: ch,
        color: getChannelColor(idx),
      };
    });
    return config;
  }, [channels]);

  const filteredData = data;

  return (
    <Card className="pt-0 col-span-2">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>Daily Gross Revenue Trend</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {filteredData.length === 0 ? (
          <div className="w-full h-50 flex items-center justify-center text-muted-foreground">
            No data available for the selected range.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-62.5 w-full"
          >
            <AreaChart data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={value => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={90}
                tickFormatter={value => Number(value).toLocaleString("id-ID")}
                allowDecimals={false}
                domain={[0, 'auto']}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={value => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              {channels.map((channel, idx) => (
                <React.Fragment key={channel}>
                  <defs>
                    <linearGradient
                      id={`fill-${channel}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getChannelColor(idx)}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={getChannelColor(idx)}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey={channel}
                    type="natural"
                    fill={`url(#fill-${channel})`}
                    stroke={getChannelColor(idx)}
                    name={channel}
                  />
                </React.Fragment>
              ))}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
