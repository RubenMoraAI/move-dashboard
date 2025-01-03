"use client";

import React from "react";
import { CheckCircle, Star } from "lucide-react";
import { useConfetti } from "@/context/ConfettiContext";

type PlanCardProps = {
  name: string;
  popular?: boolean;
  monthlyPrice: string;
  annualPrice: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  trial: string;
  includeText: string;
  billingCycle: string;
  buttonStyle: "disabled" | "outline" | "primary";
};

const PlanCard  = ({
  name,
  popular,
  monthlyPrice,
  annualPrice,
  period,
  description,
  features,
  buttonText,
  trial,
  includeText,
  billingCycle,
  buttonStyle,
}:PlanCardProps) => {
  const { triggerConfetti } = useConfetti();

  const getButtonClass = () => {
    switch (buttonStyle) {
      case "disabled":
        return "bg-gray-100 text-gray-500 cursor-not-allowed";
      case "outline":
        return "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white";
      case "primary":
        return "bg-indigo-500 text-white hover:bg-indigo-600";
      default:
        return "";
    }
  };

  const handleButtonClick = () => {
    if (buttonStyle !== "disabled") {
      triggerConfetti();
    }
  };

  return (
    <div
      className={`relative border shadow-lg rounded-xl bg-white dark:bg-gray-700 flex flex-col justify-between ${popular
        ? "border-indigo-500 shadow-md"
        : "border-gray-200 dark:border-gray-700"
        }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-4 right-4 flex items-center justify-center gap-1 px-3 py-1 text-sm font-medium text-indigo-500 dark:text-indigo-200 border border-indigo-500 rounded-full bg-white dark:bg-gray-700">
          <Star
            className="w-6 h-6 text-indigo-500 dark:text-indigo-200"
            fill="currentColor"
            stroke="none"
          />
          <span className="leading-none">Popular</span>
        </div>
      )}

      {/* Plan Header with Gradient */}
      <div
        className={`p-6 rounded-t-xl ${popular
          ? "bg-gradient-to-b from-indigo-200 to-white dark:from-indigo-600 dark:to-gray-800"
          : "bg-gradient-to-b from-gray-50 to-white dark:from-gray-700 dark:to-gray-800"
          }`}
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
          {name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 ">
          {description}
        </p>
        <div className="mt-4">
          <p className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            {billingCycle === "Monthly" ? monthlyPrice : annualPrice}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{period}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mt-auto">
          <button
            className={`w-full py-3 rounded-lg font-bold text-lg ${getButtonClass()}`}
            disabled={buttonStyle === "disabled"}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            {trial}
          </p>
        </div>
      </div>
      {/* Features Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Features
        </h3>
        <p className="mb-4 text-md text-gray-400 dark:text-gray-100 ">
          {includeText}
        </p>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-800 dark:text-gray-200"
            >
              <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
