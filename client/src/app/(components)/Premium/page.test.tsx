import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UpgradePlanPage from "./page";
import { PLANS_FEATURES } from "./components/planFeatures";

jest.mock("./components/BillingToggle", () => {
    const MockBillingToggle = ({ billingCycle, setBillingCycle }: any) => (
      <div data-testid="billing-toggle">
        <button onClick={() => setBillingCycle("Monthly")}>Monthly</button>
        <button onClick={() => setBillingCycle("Annual")}>Annual</button>
      </div>
    );
    MockBillingToggle.displayName = "BillingToggle"; 
    return MockBillingToggle;
  });
  
jest.mock("./components/PlanCard", () => {
  const PlanCard = ({ name }: any) => (
    <div data-testid="plan-card">{name}</div>
  );
  PlanCard.displayName = "PlanCard";
  return PlanCard;
});

jest.mock("./components/PlanCard", () => {
  const PlanCard = ({ name }: any) => (
    <div data-testid="plan-card">{name}</div>
  );
  PlanCard.displayName = "PlanCard";
  return PlanCard;
});

describe("UpgradePlanPage Component", () => {
  it("renders the header correctly", () => {
    render(<UpgradePlanPage />);

    expect(screen.getByRole("heading", { name: /Upgrade Plan/i })).toBeInTheDocument();
    expect(screen.getByText(/Our pricing plans are designed to meet your needs as you grow/i)).toBeInTheDocument();
  });

  it("renders the BillingToggle component", () => {
    render(<UpgradePlanPage />);

    expect(screen.getByTestId("billing-toggle")).toBeInTheDocument();
  });

  it("renders the correct number of PlanCard components", () => {
    render(<UpgradePlanPage />);

    const planCards = screen.getAllByTestId("plan-card");
    expect(planCards).toHaveLength(PLANS_FEATURES.length);

    
    PLANS_FEATURES.forEach((plan) => {
      expect(screen.getByText(plan.name)).toBeInTheDocument();
    });
  });

  it("changes billing cycle when BillingToggle is clicked", () => {
    render(<UpgradePlanPage />);

    const monthlyButton = screen.getByText("Monthly");
    const annualButton = screen.getByText("Annual");

    fireEvent.click(monthlyButton);
    expect(screen.queryByTestId("billing-toggle")).toBeInTheDocument();

    fireEvent.click(annualButton);
    expect(screen.queryByTestId("billing-toggle")).toBeInTheDocument();
  });

});

