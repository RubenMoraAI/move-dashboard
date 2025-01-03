"use client";

import React from "react";
import { useState } from "react";
import BillingToggle from "./components/BillingToggle";
import PlanCard from "./components/PlanCard";
import { PLANS_FEATURES } from "./components/planFeatures";
import { ThumbsUp } from "lucide-react";
import UserInviteCard from "./components/UserInviteCard";

const UpgradePlanPage = () => {
  const [billingCycle, setBillingCycle] = useState("Annual");

  return (
    <div className="py-16 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <div className="flex row justify-between"><h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-left">
          Upgrade Plan
        </h1> <div className="flex justify-center mb-8">
        <UserInviteCard />
      </div></div>
        
        <p className="flex text-lg text-gray-600 dark:text-gray-300 text-left mt-2">
          <ThumbsUp className="mr-2" />Our pricing plans are designed to meet your needs as you grow.
        </p>
      </div>
     

      {/* Billing Toggle */}
      <BillingToggle
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PLANS_FEATURES.map((plan, index) => (
          <PlanCard
            key={index}
            name={plan.name}
            popular={plan.popular}
            monthlyPrice={plan.monthlyPrice}
            annualPrice={plan.annualPrice}
            period={plan.period}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            trial={plan.trial}
            includeText={plan.includeText}
            billingCycle={billingCycle}
            buttonStyle={plan.buttonStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default UpgradePlanPage;
