"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const chartConfig = {
  marketCapitalization: {
    label: "時価総額",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function AreaChartCard({
  className,
  data,
}: {
  className?: string;
  data: number[];
}) {
  const chartData: { year: string; marketCapitalization: number }[] = [
    { year: "2020", marketCapitalization: data[0] },
    { year: "2021", marketCapitalization: data[1] },
    { year: "2022", marketCapitalization: data[2] },
    { year: "2023", marketCapitalization: data[3] },
    { year: "2024", marketCapitalization: data[4] },
  ];
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>時価総額</CardTitle>
        <CardDescription>2020 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-[320px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="marketCapitalization"
              type="natural"
              fill="var(--color-marketCapitalization)"
              fillOpacity={0.4}
              stroke="var(--color-marketCapitalization)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
