"use client";

import React from "react";

type BillingToggleProps = {
  billingCycle: string;
  setBillingCycle: (value: string) => void;
};

const BillingToggle  = ({
  billingCycle,
  setBillingCycle,
}:BillingToggleProps) => {
  const handleToggle = (cycle: string) => {
    setBillingCycle(cycle);
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <button
        className={`px-4 py-2 text-lg font-medium rounded-l-lg ${
          billingCycle === "Monthly"
            ? "bg-indigo-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        }`}
        onClick={() => handleToggle("Monthly")}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-2 text-lg font-medium rounded-r-lg ${
          billingCycle === "Annual"
            ? "bg-indigo-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        }`}
        onClick={() => handleToggle("Annual")}
      >
        Annual (Save 50%)
      </button>
    </div>
  );
};

export default BillingToggle;
