"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { cn } from "@/lib/utils";
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

const chartConfig = {
  value: {
    label: "ポイント",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RadarChartCard({
  className,
  data,
}: {
  className?: string;
  data: number[];
}) {
  const chartData: { name: string; value: number }[] = [
    { name: "技術革新", value: data[0] },
    { name: "影響力", value: data[1] },
    { name: "市場シェア", value: data[2] },
    { name: "収益性", value: data[3] },
    { name: "顧客満足度", value: data[4] },
    { name: "社会的責任", value: data[5] },
  ];
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="items-center pb-4">
        <CardTitle>総合評価</CardTitle>
        <CardDescription>General Evaluation</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[240px] md:max-h-[320px] w-full"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
