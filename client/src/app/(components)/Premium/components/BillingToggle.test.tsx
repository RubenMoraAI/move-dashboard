import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BillingToggle from "./BillingToggle";

describe("BillingToggle Component", () => {
  const mockSetBillingCycle = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    billingCycle: "Monthly",
    setBillingCycle: mockSetBillingCycle,
  };

  it("renders both buttons with correct labels", () => {
    render(<BillingToggle {...defaultProps} />);

    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Annual (Save 50%)")).toBeInTheDocument();
  });

  it("applies active styles to the 'Monthly' button when billingCycle is 'Monthly'", () => {
    render(<BillingToggle {...defaultProps} billingCycle="Monthly" />);

    const monthlyButton = screen.getByText("Monthly");
    expect(monthlyButton).toHaveClass("bg-indigo-500 text-white");

    const annualButton = screen.getByText("Annual (Save 50%)");
    expect(annualButton).toHaveClass("bg-gray-200 dark:bg-gray-700 dark:text-gray-300");
  });

  it("applies active styles to the 'Annual' button when billingCycle is 'Annual'", () => {
    render(<BillingToggle {...defaultProps} billingCycle="Annual" />);

    const annualButton = screen.getByText("Annual (Save 50%)");
    expect(annualButton).toHaveClass("bg-indigo-500 text-white");

    const monthlyButton = screen.getByText("Monthly");
    expect(monthlyButton).toHaveClass("bg-gray-200 dark:bg-gray-700 dark:text-gray-300");
  });

  it("calls setBillingCycle with 'Monthly' when the 'Monthly' button is clicked", () => {
    render(<BillingToggle {...defaultProps} billingCycle="Annual" />);

    const monthlyButton = screen.getByText("Monthly");
    fireEvent.click(monthlyButton);

    expect(mockSetBillingCycle).toHaveBeenCalledTimes(1);
    expect(mockSetBillingCycle).toHaveBeenCalledWith("Monthly");
  });

  it("calls setBillingCycle with 'Annual' when the 'Annual' button is clicked", () => {
    render(<BillingToggle {...defaultProps} billingCycle="Monthly" />);

    const annualButton = screen.getByText("Annual (Save 50%)");
    fireEvent.click(annualButton);

    expect(mockSetBillingCycle).toHaveBeenCalledTimes(1);
    expect(mockSetBillingCycle).toHaveBeenCalledWith("Annual");
  });
});
