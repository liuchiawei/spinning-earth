"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    label: "人気度",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function LineChartCard({
  className,
  data,
}: {
  className?: string;
  data: number[];
}) {
  const chartData: { time: string; value: number }[] = [
    { time: "2004-01", value: data[0] },
    { time: "2004-02", value: data[1] },
    { time: "2004-03", value: data[2] },
    { time: "2004-04", value: data[3] },
    { time: "2004-05", value: data[4] },
    { time: "2004-06", value: data[5] },
    { time: "2004-07", value: data[6] },
    { time: "2004-08", value: data[7] },
    { time: "2004-09", value: data[8] },
    { time: "2004-10", value: data[9] },
    { time: "2004-11", value: data[10] },
    { time: "2004-12", value: data[11] },
    { time: "2005-01", value: data[12] },
    { time: "2005-02", value: data[13] },
    { time: "2005-03", value: data[14] },
    { time: "2005-04", value: data[15] },
    { time: "2005-05", value: data[16] },
    { time: "2005-06", value: data[17] },
    { time: "2005-07", value: data[18] },
    { time: "2005-08", value: data[19] },
    { time: "2005-09", value: data[20] },
    { time: "2005-10", value: data[21] },
    { time: "2005-11", value: data[22] },
    { time: "2005-12", value: data[23] },
    { time: "2006-01", value: data[24] },
    { time: "2006-02", value: data[25] },
    { time: "2006-03", value: data[26] },
    { time: "2006-04", value: data[27] },
    { time: "2006-05", value: data[28] },
    { time: "2006-06", value: data[29] },
    { time: "2006-07", value: data[30] },
    { time: "2006-08", value: data[31] },
    { time: "2006-09", value: data[32] },
    { time: "2006-10", value: data[33] },
    { time: "2006-11", value: data[34] },
    { time: "2006-12", value: data[35] },
    { time: "2007-01", value: data[36] },
    { time: "2007-02", value: data[37] },
    { time: "2007-03", value: data[38] },
    { time: "2007-04", value: data[39] },
    { time: "2007-05", value: data[40] },
    { time: "2007-06", value: data[41] },
    { time: "2007-07", value: data[42] },
    { time: "2007-08", value: data[43] },
    { time: "2007-09", value: data[44] },
    { time: "2007-10", value: data[45] },
    { time: "2007-11", value: data[46] },
    { time: "2007-12", value: data[47] },
    { time: "2008-01", value: data[48] },
    { time: "2008-02", value: data[49] },
    { time: "2008-03", value: data[50] },
    { time: "2008-04", value: data[51] },
    { time: "2008-05", value: data[52] },
    { time: "2008-06", value: data[53] },
    { time: "2008-07", value: data[54] },
    { time: "2008-08", value: data[55] },
    { time: "2008-09", value: data[56] },
    { time: "2008-10", value: data[57] },
    { time: "2008-11", value: data[58] },
    { time: "2008-12", value: data[59] },
    { time: "2009-01", value: data[60] },
    { time: "2009-02", value: data[61] },
    { time: "2009-03", value: data[62] },
    { time: "2009-04", value: data[63] },
    { time: "2009-05", value: data[64] },
    { time: "2009-06", value: data[65] },
    { time: "2009-07", value: data[66] },
    { time: "2009-08", value: data[67] },
    { time: "2009-09", value: data[68] },
    { time: "2009-10", value: data[69] },
    { time: "2009-11", value: data[70] },
    { time: "2009-12", value: data[71] },
    { time: "2010-01", value: data[72] },
    { time: "2010-02", value: data[73] },
    { time: "2010-03", value: data[74] },
    { time: "2010-04", value: data[75] },
    { time: "2010-05", value: data[76] },
    { time: "2010-06", value: data[77] },
    { time: "2010-07", value: data[78] },
    { time: "2010-08", value: data[79] },
    { time: "2010-09", value: data[80] },
    { time: "2010-10", value: data[81] },
    { time: "2010-11", value: data[82] },
    { time: "2010-12", value: data[83] },
    { time: "2011-01", value: data[84] },
    { time: "2011-02", value: data[85] },
    { time: "2011-03", value: data[86] },
    { time: "2011-04", value: data[87] },
    { time: "2011-05", value: data[88] },
    { time: "2011-06", value: data[89] },
    { time: "2011-07", value: data[90] },
    { time: "2011-08", value: data[91] },
    { time: "2011-09", value: data[92] },
    { time: "2011-10", value: data[93] },
    { time: "2011-11", value: data[94] },
    { time: "2011-12", value: data[95] },
    { time: "2012-01", value: data[96] },
    { time: "2012-02", value: data[97] },
    { time: "2012-03", value: data[98] },
    { time: "2012-04", value: data[99] },
    { time: "2012-05", value: data[100] },
    { time: "2012-06", value: data[101] },
    { time: "2012-07", value: data[102] },
    { time: "2012-08", value: data[103] },
    { time: "2012-09", value: data[104] },
    { time: "2012-10", value: data[105] },
    { time: "2012-11", value: data[106] },
    { time: "2012-12", value: data[107] },
    { time: "2013-01", value: data[108] },
    { time: "2013-02", value: data[109] },
    { time: "2013-03", value: data[110] },
    { time: "2013-04", value: data[111] },
    { time: "2013-05", value: data[112] },
    { time: "2013-06", value: data[113] },
    { time: "2013-07", value: data[114] },
    { time: "2013-08", value: data[115] },
    { time: "2013-09", value: data[116] },
    { time: "2013-10", value: data[117] },
    { time: "2013-11", value: data[118] },
    { time: "2013-12", value: data[119] },
    { time: "2014-01", value: data[120] },
    { time: "2014-02", value: data[121] },
    { time: "2014-03", value: data[122] },
    { time: "2014-04", value: data[123] },
    { time: "2014-05", value: data[124] },
    { time: "2014-06", value: data[125] },
    { time: "2014-07", value: data[126] },
    { time: "2014-08", value: data[127] },
    { time: "2014-09", value: data[128] },
    { time: "2014-10", value: data[129] },
    { time: "2014-11", value: data[130] },
    { time: "2014-12", value: data[131] },
    { time: "2015-01", value: data[132] },
    { time: "2015-02", value: data[133] },
    { time: "2015-03", value: data[134] },
    { time: "2015-04", value: data[135] },
    { time: "2015-05", value: data[136] },
    { time: "2015-06", value: data[137] },
    { time: "2015-07", value: data[138] },
    { time: "2015-08", value: data[139] },
    { time: "2015-09", value: data[140] },
    { time: "2015-10", value: data[141] },
    { time: "2015-11", value: data[142] },
    { time: "2015-12", value: data[143] },
    { time: "2016-01", value: data[144] },
    { time: "2016-02", value: data[145] },
    { time: "2016-03", value: data[146] },
    { time: "2016-04", value: data[147] },
    { time: "2016-05", value: data[148] },
    { time: "2016-06", value: data[149] },
    { time: "2016-07", value: data[150] },
    { time: "2016-08", value: data[151] },
    { time: "2016-09", value: data[152] },
    { time: "2016-10", value: data[153] },
    { time: "2016-11", value: data[154] },
    { time: "2016-12", value: data[155] },
    { time: "2017-01", value: data[156] },
    { time: "2017-02", value: data[157] },
    { time: "2017-03", value: data[158] },
    { time: "2017-04", value: data[159] },
    { time: "2017-05", value: data[160] },
    { time: "2017-06", value: data[161] },
    { time: "2017-07", value: data[162] },
    { time: "2017-08", value: data[163] },
    { time: "2017-09", value: data[164] },
    { time: "2017-10", value: data[165] },
    { time: "2017-11", value: data[166] },
    { time: "2017-12", value: data[167] },
    { time: "2018-01", value: data[168] },
    { time: "2018-02", value: data[169] },
    { time: "2018-03", value: data[170] },
    { time: "2018-04", value: data[171] },
    { time: "2018-05", value: data[172] },
    { time: "2018-06", value: data[173] },
    { time: "2018-07", value: data[174] },
    { time: "2018-08", value: data[175] },
    { time: "2018-09", value: data[176] },
    { time: "2018-10", value: data[177] },
    { time: "2018-11", value: data[178] },
    { time: "2018-12", value: data[179] },
    { time: "2019-01", value: data[180] },
    { time: "2019-02", value: data[181] },
    { time: "2019-03", value: data[182] },
    { time: "2019-04", value: data[183] },
    { time: "2019-05", value: data[184] },
    { time: "2019-06", value: data[185] },
    { time: "2019-07", value: data[186] },
    { time: "2019-08", value: data[187] },
    { time: "2019-09", value: data[188] },
    { time: "2019-10", value: data[189] },
    { time: "2019-11", value: data[190] },
    { time: "2019-12", value: data[191] },
    { time: "2020-01", value: data[192] },
    { time: "2020-02", value: data[193] },
    { time: "2020-03", value: data[194] },
    { time: "2020-04", value: data[195] },
    { time: "2020-05", value: data[196] },
    { time: "2020-06", value: data[197] },
    { time: "2020-07", value: data[198] },
    { time: "2020-08", value: data[199] },
    { time: "2020-09", value: data[200] },
    { time: "2020-10", value: data[201] },
    { time: "2020-11", value: data[202] },
    { time: "2020-12", value: data[203] },
    { time: "2021-01", value: data[204] },
    { time: "2021-02", value: data[205] },
    { time: "2021-03", value: data[206] },
    { time: "2021-04", value: data[207] },
    { time: "2021-05", value: data[208] },
    { time: "2021-06", value: data[209] },
    { time: "2021-07", value: data[210] },
    { time: "2021-08", value: data[211] },
    { time: "2021-09", value: data[212] },
    { time: "2021-10", value: data[213] },
    { time: "2021-11", value: data[214] },
    { time: "2021-12", value: data[215] },
    { time: "2022-01", value: data[216] },
    { time: "2022-02", value: data[217] },
    { time: "2022-03", value: data[218] },
    { time: "2022-04", value: data[219] },
    { time: "2022-05", value: data[220] },
    { time: "2022-06", value: data[221] },
    { time: "2022-07", value: data[222] },
    { time: "2022-08", value: data[223] },
    { time: "2022-09", value: data[224] },
    { time: "2022-10", value: data[225] },
    { time: "2022-11", value: data[226] },
    { time: "2022-12", value: data[227] },
    { time: "2023-01", value: data[228] },
    { time: "2023-02", value: data[229] },
    { time: "2023-03", value: data[230] },
    { time: "2023-04", value: data[231] },
    { time: "2023-05", value: data[232] },
    { time: "2023-06", value: data[233] },
    { time: "2023-07", value: data[234] },
    { time: "2023-08", value: data[235] },
    { time: "2023-09", value: data[236] },
    { time: "2023-10", value: data[237] },
    { time: "2023-11", value: data[238] },
    { time: "2023-12", value: data[239] },
    { time: "2024-01", value: data[240] },
    { time: "2024-02", value: data[241] },
    { time: "2024-03", value: data[242] },
    { time: "2024-04", value: data[243] },
    { time: "2024-05", value: data[244] },
    { time: "2024-06", value: data[245] },
    { time: "2024-07", value: data[246] },
    { time: "2024-08", value: data[247] },
    { time: "2024-09", value: data[248] },
    { time: "2024-10", value: data[249] },
    { time: "2024-11", value: data[250] },
    { time: "2024-12", value: data[251] },
    { time: "2025-01", value: data[252] },
    { time: "2025-02", value: data[253] },
  ];
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>人気度</CardTitle>
        <CardDescription>2004 - 現在</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-[270px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            height={100}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              defaultIndex={1}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-value)"
              strokeWidth={1.2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          2004年から現在までの Google 検索のトレンド{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          資料の出所：
          <a
            href="https://trends.google.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Googleトレンド
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
