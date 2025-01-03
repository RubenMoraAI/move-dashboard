import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReportsPage from "./page";

describe("ReportsPage Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<ReportsPage />);

    expect(container).not.toBeEmptyDOMElement();
  });

  it("displays the correct title", () => {
    render(<ReportsPage />);

    expect(
      screen.getByText("Reports is a Premium page")
    ).toBeInTheDocument();
  });

  it("displays the correct description", () => {
    render(<ReportsPage />);

    expect(screen.getByText("Upgrade to get Access")).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    const { container } = render(<ReportsPage />);

    expect(container.firstChild).toHaveClass("flex items-center justify-center h-screen bg-gray-100");
    expect(screen.getByText("Reports is a Premium page")).toHaveClass("text-2xl font-semibold text-gray-800");
    expect(screen.getByText("Upgrade to get Access")).toHaveClass("mt-4 text-gray-600");
  });
});
