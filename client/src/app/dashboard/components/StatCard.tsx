import { LucideIcon } from "lucide-react";
import React from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
  cssProperty?: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
  cssProperty = "",
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400";

  return (
    <div
      className={`bg-white dark:bg-gray-700 shadow-md rounded-2xl flex flex-col justify-between ${cssProperty}`}
    >
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
            {title}
          </h2>
          <span className="text-xs text-indigo-600 dark:text-indigo-400">
            {dateRange}
          </span>
        </div>
        <hr className="border-gray-300 dark:border-gray-600" />
      </div>

      {/* BODY */}
      <div className="flex mb-6 items-center justify-between gap-4 px-5">
        {/* Icon */}
        <div className="rounded-full p-5 bg-indigo-100 dark:bg-indigo-500 border-indigo-300 dark:border-gray-600 border-[1px] flex-shrink-1">
          {primaryIcon}
        </div>
        {/* Details */}
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                {/* Title */}
                <span className="text-gray-500 dark:text-gray-400 flex-1 block lg:hidden xl:block">
                  {detail.title}
                </span>
                {/* Amount */}
                <span className="font-bold text-gray-800 dark:text-gray-100 flex-1 text-right">
                  {detail.amount}
                </span>
                {/* Percentage */}
                <div className="flex items-center flex-1 justify-end">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && (
                <hr className="border-gray-300 dark:border-gray-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
