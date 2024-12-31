"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { month: "Jan", income: 15000, expense: 12000 },
    { month: "Feb", income: 18000, expense: 11000 },
    { month: "Mar", income: 20000, expense: 16000 },
    { month: "Apr", income: 22000, expense: 10000 },
    { month: "May", income: 24000, expense: 11000 },
    { month: "Jun", income: 16488, expense: 13000 },
    { month: "Jul", income: 21000, expense: 12000 },
    { month: "Aug", income: 22000, expense: 18000 },
    { month: "Sep", income: 21000, expense: 14000 },
    { month: "Oct", income: 23000, expense: 19000 },
    { month: "Nov", income: 19000, expense: 21000 },
    { month: "Dec", income: 25000, expense: 16000 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(145, 63%, 49%)", // Softer green
  },
  expense: {
    label: "Expense",
    color: "hsl(354, 70%, 54%)", // Softer red
  },
} satisfies ChartConfig



export function IncomeExpenseChart() {
  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expense: chartData.reduce((acc, curr) => acc + curr.expense, 0),
    }),
    []
  )

  

  return (
    <Card className="py-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Monthly Income and Expenses</CardTitle>
          <CardDescription>
            Overview of your monthly financial performance.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="month"
                  labelFormatter={(value) => `Month: ${value}`}
                  payloadFormatter={(payload: any) => 
                    `Income: $${payload.income.toLocaleString("en-US")} | Expense: $${payload.expense.toLocaleString("en-US")}`
                  }
                  
                />
              }
            />
            <Bar dataKey="income" fill={chartConfig.income.color} />
            <Bar dataKey="expense" fill={chartConfig.expense.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
  Total Income: ${total.income.toLocaleString("en-US")} <TrendingUp className="h-4 w-4 text-green-600" />
</div>
<div className="flex gap-2 font-medium leading-none">
  Total Expense: ${total.expense.toLocaleString("en-US")} <TrendingDown className="h-4 w-4 text-red-600" />
</div>

        <div className="leading-none text-muted-foreground">
          Track and optimize your spending habits for better financial planning.
        </div>
      </CardFooter>
    </Card>
  )
}
