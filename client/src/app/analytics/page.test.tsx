import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnalyticsPage from "./page";

describe("AnalyticsPage Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<AnalyticsPage />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("displays the correct title", () => {
    render(<AnalyticsPage />);

    expect(
      screen.getByText("Analytics is a Premium page")
    ).toBeInTheDocument();
  });

  it("displays the correct description", () => {
    render(<AnalyticsPage />);

    expect(screen.getByText("Upgrade to get Access")).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    const { container } = render(<AnalyticsPage />);

    expect(container.firstChild).toHaveClass("flex items-center justify-center h-screen bg-gray-100");
    expect(screen.getByText("Analytics is a Premium page")).toHaveClass("text-2xl font-semibold text-gray-800");
    expect(screen.getByText("Upgrade to get Access")).toHaveClass("mt-4 text-gray-600");
  });
});
