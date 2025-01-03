import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardPurchaseSummary from "./CardPurchaseSummary";
import { useGetDashboardMetricsQuery } from "@/state/api";

jest.mock("@/state/api", () => ({
  useGetDashboardMetricsQuery: jest.fn(),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: (props: any) => <div data-testid="responsive-container">{props.children}</div>,
  AreaChart: (props: any) => <div data-testid="area-chart">{props.children}</div>,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Area: ({ dataKey }: any) => <div data-testid={`area-${dataKey}`} />,
}));

describe("CardPurchaseSummary Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: false,
    });

    render(<CardPurchaseSummary cssProperty="custom-class" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<CardPurchaseSummary cssProperty="custom-class" />);

    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });

  it("renders chart with data", () => {
    const mockData = {
      multiAreaSummary: [
        { date: "2023-10-01", sales: 500, purchases: 300, expenses: 200 },
        { date: "2023-10-02", sales: 600, purchases: 400, expenses: 300 },
      ],
    };

    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: false,
    });

    render(<CardPurchaseSummary cssProperty="custom-class" />);


    expect(screen.getByText("Monthly Comparison")).toBeInTheDocument();


    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("area-chart")).toBeInTheDocument();
    expect(screen.getByTestId("area-sales")).toBeInTheDocument();
    expect(screen.getByTestId("area-purchases")).toBeInTheDocument();
    expect(screen.getByTestId("area-expenses")).toBeInTheDocument();
  });

  it("applies custom CSS classes", () => {
    render(<CardPurchaseSummary cssProperty="custom-class" />);
   
    const container = screen.getByTestId("card-purchase-summary");
    expect(container).toHaveClass("custom-class");
  });
});
