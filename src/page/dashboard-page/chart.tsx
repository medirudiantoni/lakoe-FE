'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'Januari', desktop: 136 },
  { month: 'Februari', desktop: 100 },
  { month: 'Maret', desktop: 102 },
  { month: 'April', desktop: 73 },
  { month: 'Mei', desktop: 113 },
  { month: 'Juni', desktop: 44 },
  { month: 'Juli', desktop: 45 },
  { month: 'Agustus', desktop: 75 },
  { month: 'September', desktop: 46 },
  { month: 'Oktober', desktop: 77 },
  { month: 'November', desktop: 64 },
  { month: 'Desember', desktop: 54 },
];

const chartConfig = {
  desktop: {
    label: 'Penjualan',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Produk Terjual</CardTitle>
        <CardDescription>Januari - Desember 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="desktop"
              fill="#4299E1"
              radius={8}
              barSize={76}
              height={12}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tren naik sebesar 5,2% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan total pengunjung selama 6 bulan terakhir
        </div>
      </CardFooter>
    </Card>
  );
}
