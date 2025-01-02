'use client';

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { MultiAreaSummaryData } from "@/types";


interface CardPurchaseSummaryProps {
  cssProperty?: string;
}

const CardPurchaseSummary = ({ cssProperty }: CardPurchaseSummaryProps) => {
  const { data, isLoading, error } = useGetDashboardMetricsQuery();

  const multiAreaData: MultiAreaSummaryData[] = (data?.multiAreaSummary || []).map((item) => ({
    date: item.date,
    sales: item.sales,
    purchases: item.purchases,
    expenses: item.expenses,
  }));

  const labels: Record<"sales" | "purchases" | "expenses", string> = {
    sales: "Sales",
    purchases: "Purchases",
    expenses: "Expenses",
  };

  return (
    <div
      className={`flex flex-col justify-between bg-white dark:bg-gray-700 shadow-md rounded-2xl ${cssProperty}`}
    >
      {isLoading ? (
        <div className="m-5 text-gray-500 dark:text-gray-400">Loading...</div>
      ) : error ? (
        <div className="m-5 text-red-500 dark:text-red-400">Error loading data</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5 text-gray-800 dark:text-gray-200">
              Monthly Comparison
            </h2>
            <hr className="border-gray-200 dark:border-gray-600" />
          </div>

          {/* CHART */}
          <ResponsiveContainer width="100%" height={250} className="px-4">
            <AreaChart
              data={multiAreaData}
              margin={{ top: 5, right: 50, left: 50, bottom: 25 }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })
                }
                axisLine={true}
                tickLine={true}
                tick={{ fill: "rgb(170, 172, 175)", fontSize: 12 }}
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fill: "rgb(170, 172, 175)", fontSize: 12 }}
                domain={["dataMin", "dataMax"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgb(31, 41, 55)",
                  borderColor: "rgb(55, 65, 81)",
                  color: "rgb(249, 250, 251)",
                }}
                formatter={(value: number, name: keyof typeof labels) =>
                  [`$${value.toLocaleString()}`, labels[name] || name]
                }
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })
                }
              />
              {/* AREA: Sales */}
              <Area
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="rgb(79, 70, 229)"
                fill="rgba(79, 70, 229, 0.5)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              {/* AREA: Purchases */}
              <Area
                type="monotone"
                dataKey="purchases"
                name="Purchases"
                stroke="rgb(147, 51, 234)"
                fill="rgba(147, 51, 234, 0.5)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              {/* AREA: Expenses */}
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="rgb(190, 24, 93)"
                fill="rgba(190, 24, 93, 0.5)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>

          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
