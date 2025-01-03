import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CardSalesSummaryProps {
  cssProperty?: string;
}

const CardSalesSummary = ({ cssProperty = "" }: CardSalesSummaryProps) => {
  const { data, isLoading, isError, error } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];

  const [timeFrame, setTimeFrame] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    console.error("Error fetching dashboard metrics:", error);
    return (
      <div className="m-5 dark:text-gray-300">
        Failed to fetch data, {JSON.stringify(error, null, 2)}
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-700 shadow-md rounded-2xl flex flex-col justify-between ${cssProperty}`}
    >
      {isLoading ? (
        <div className="m-5 dark:text-gray-300">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5 text-gray-700 dark:text-gray-200">
              Sales Summary
            </h2>
            <hr className="border-gray-300 dark:border-gray-600" />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400 dark:text-gray-400">Value</p>
                <span className="text-2xl font-extrabold text-gray-700 dark:text-gray-200">
                  $
                  {(totalValueSum / 1000000).toLocaleString("en", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-green-500 text-md ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select
                id="timeFrame"
                className="shadow-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded"
                value={timeFrame}
                onChange={(e) => {
                  setTimeFrame(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
  <BarChart
    data={salesData}
    margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
  >
    <CartesianGrid
      strokeDasharray="3 3"
      vertical={false}
      stroke="#d1d5db"
      className="dark:stroke-gray-700"
    />
    <XAxis
      dataKey="date"
      tickFormatter={(value) => {
        const date = new Date(value);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }}
      tickLine={false}
      axisLine={false}
      tick={{
        fontSize: 12,
        fill: "#999999", 
        className: "dark:fill-gray-200", 
      }}
    />
    <YAxis
      tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}m`}
      tickLine={false}
      axisLine={false}
      tick={{
        fontSize: 12,
        dx: -1,
        fill: "#999999", 
        className: "dark:fill-gray-100", 
      }}
    />
    <Tooltip
      cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} 
      formatter={(value: number) => `$${value.toLocaleString("en")}`}
      labelFormatter={(label) => {
        const date = new Date(label);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }}
      contentStyle={{
        backgroundColor: "#1f2937", 
        color: "#f9fafb", 
        borderRadius: "8px",
      }}
    />
    <Bar
      dataKey="totalValue"
      fill="#5A67D8"
      barSize={10}
      radius={[10, 10, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>

          </div>

          {/* FOOTER */}
          <div>
            <hr className="border-gray-300 dark:border-gray-600" />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4 text-gray-700 dark:text-gray-200">
              <p>{salesData.length || 0} days</p>
              <p role="note" className="text-sm">
                Highest Sales Date:{" "}
                <span className="font-bold">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
