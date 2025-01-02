"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CardExpenseSummary from "./components/CardExpenseSummary";
import CardPopularProducts from "./components/CardPopularProducts";
import CardPurchaseSummary from "./components/CardPurchaseSummary";
import CardSalesSummary from "./components/CardSalesSummary";
import StatCard from "./components/StatCard";
import CardGoogleMap from "./components/CardGoogleMap";
import { useGetSalesDataQuery } from "@/state/api";

const Dashboard = () => {

  const { data: salesData, isLoading, isError } = useGetSalesDataQuery();

  const statCardData = [
    {
      title: "Customer & Expenses",
      primaryIcon: <Package className="text-indigo-600 dark:text-indigo-300 w-6 h-6" />,
      dateRange: "22 - 29 October 2023",
      details: [
        {
          title: "Customer Growth",
          amount: "175.00",
          changePercentage: 131,
          IconComponent: TrendingUp,
        },
        {
          title: "Expenses",
          amount: "10.00",
          changePercentage: -56,
          IconComponent: TrendingDown,
        },
      ],
    },
    {
      title: "Dues & Pending Orders",
      primaryIcon: <CheckCircle className="text-indigo-600 dark:text-indigo-300 w-6 h-6" />,
      dateRange: "22 - 29 October 2023",
      details: [
        {
          title: "Dues",
          amount: "250.00",
          changePercentage: 131,
          IconComponent: TrendingUp,
        },
        {
          title: "Pending Orders",
          amount: "147",
          changePercentage: -56,
          IconComponent: TrendingDown,
        },
      ],
    },
    {
      title: "Sales & Discount",
      primaryIcon: <Tag className="text-indigo-600 dark:text-indigo-300 w-6 h-6" />,
      dateRange: "22 - 29 October 2023",
      details: [
        {
          title: "Sales",
          amount: "1000.00",
          changePercentage: 20,
          IconComponent: TrendingUp,
        },
        {
          title: "Discount",
          amount: "200.00",
          changePercentage: -10,
          IconComponent: TrendingDown,
        },
      ],
    },
  ];

  if (isLoading) return <div>Loading sales data...</div>;
  if (isError) return <div>Failed to fetch sales data.</div>;

  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-4 grid-rows-[repeat(16,minmax(0,180px))] md:grid-rows-[repeat(13,minmax(0,180px))] lg:grid-rows-[repeat(8,minmax(0,180px))]">
      {statCardData.map((statCard, index) => (
        <StatCard
          key={index}
          title={statCard.title}
          primaryIcon={statCard.primaryIcon}
          dateRange={statCard.dateRange}
          details={statCard.details}
          cssProperty="row-span-1 col-span-4 md:col-span-1 md:col-start-1 lg:col-span-4"
        />
      ))}

      <CardPopularProducts
        cssProperty="row-span-3 col-span-4 md:col-start-2 md:col-span-1 lg:col-span-4 lg:row-span-3 lg:col-start-1"
      />

      <CardSalesSummary
        cssProperty="row-span-3 col-span-4 md:col-start-1 md:col-span-2 lg:col-span-6 lg:row-span-3 lg:col-start-7"
      />

      <CardGoogleMap
        salesData={salesData!}
        cssProperty="row-span-3 col-span-4 md:col-span-2 lg:col-span-8 lg:row-start-2 lg:col-start-5 lg:row-span-3"
      />

      <CardPurchaseSummary
        cssProperty="row-span-2 col-span-4 md:col-span-2 lg:col-span-12 lg:row-span-2 lg:col-start-1"
      />

      <CardExpenseSummary
        cssProperty="row-span-2 col-span-4 md:col-span-2 lg:col-span-6 lg:row-span-3"
      />
    </div>


  );
};

export default Dashboard;
