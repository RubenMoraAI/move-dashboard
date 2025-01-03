"use client";

interface planFeature {
    name: string;
    monthlyPrice: string;
    annualPrice: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    trial: string;
    includeText: string;
    popular: boolean;
    buttonStyle: "disabled" | "outline" | "primary";
}

export const PLANS_FEATURES: planFeature[] = [
    {
        name: "Starter Plan",
        monthlyPrice: "$29",
        annualPrice: "$25",
        period: "Per user / per month",
        description: "Get started with essential ecommerce and analytics tools to grow your store.",
        features: [
            "01 User Access",
            "Basic Store Analytics",
            "Product Performance Tracking",
            "Inventory Management Tools",
            "Standard Customer Insights",
            "Access to Basic Reports",
        ],
        buttonText: "Current Plan",
        trial: "Always maintain this price for you!",
        includeText: "Everything in our free plan includes!",
        popular: false,
        buttonStyle: "disabled",
    },
    {
        name: "Pro Plan",
        monthlyPrice: "$149",
        annualPrice: "$129",
        period: "Per user, per month & billed annually",
        description: "Advanced ecommerce tools to optimize sales and enhance customer experience.",
        features: [
            "05 User Access",
            "Advanced Sales Analytics",
            "Customer Segmentation Insights",
            "Customizable Dashboards",
            "Multi-Store Management",
            "Priority Customer Support",
        ],
        buttonText: "Switch to this Plan",
        trial: "Start Free 7-Days Trial",
        includeText: "Everything in Starter Plan includes!",
        popular: true,
        buttonStyle: "outline",
    },
    {
        name: "Enterprise Plan",
        monthlyPrice: "From $299",
        annualPrice: "Custom Pricing",
        period: "Custom Pricing, Custom Billing",
        description: "Comprehensive ecommerce and analytics tools for large-scale operations.",
        features: [
            "Unlimited User Access",
            "Real-Time Data Analytics",
            "Custom Integrations",
            "Advanced Admin Panel",
            "Team Collaboration Features",
            "Enterprise-Level Security",
        ],
        buttonText: "Contact Sales",
        trial: "Start Free 15-Days Trial",
        includeText: "Everything in Pro & Starter Plan includes!",
        popular: false,
        buttonStyle: "primary",
    },
];
