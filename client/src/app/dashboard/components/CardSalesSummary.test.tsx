import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardSalesSummary from "./CardSalesSummary";
import { useGetDashboardMetricsQuery } from "@/state/api";

jest.mock("@/state/api", () => ({
  useGetDashboardMetricsQuery: jest.fn(),
}));

jest.mock("recharts", () => ({
  ResponsiveContainer: (props: any) => <div data-testid="responsive-container">{props.children}</div>,
  BarChart: (props: any) => <div data-testid="bar-chart">{props.children}</div>,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Bar: ({ dataKey }: any) => <div data-testid={`bar-${dataKey}`} />,
}));

describe("CardSalesSummary Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders loading state", () => {
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<CardSalesSummary />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: "Failed to fetch data" },
    });

    render(<CardSalesSummary />);
    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });

  it("renders sales summary with data", () => {
    const mockData = {
      salesSummary: [
        { date: "2023-01-01", totalValue: 1000000, changePercentage: 10 },
        { date: "2023-01-02", totalValue: 2000000, changePercentage: 20 },
      ],
    };

    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<CardSalesSummary />);
    expect(screen.getByText("Sales Summary")).toBeInTheDocument();
    expect(screen.getByText("$3m")).toBeInTheDocument();
    expect(screen.getByText("15.00%")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
    const highestSalesDateElement = screen.getByText((content, element) => {
      const hasText = (node: Element) => node.textContent === "Highest Sales Date: 1/1/23";
      const nodeHasText = hasText(element!);
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
    expect(highestSalesDateElement).toBeInTheDocument();
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("changes time frame", () => {
    const mockData = {
      salesSummary: [
        { date: "2023-01-01", totalValue: 1000000, changePercentage: 10 },
        { date: "2023-01-02", totalValue: 2000000, changePercentage: 20 },
      ],
    };

    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<CardSalesSummary />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "monthly" } });
    expect(select).toHaveValue("monthly");
  });
  it("correctly calculates the total sum of sales values", () => {
    const mockData = {
      salesSummary: [
        { date: "2023-01-01", totalValue: 1000000, changePercentage: 10 },
        { date: "2023-01-02", totalValue: 2000000, changePercentage: 20 },
      ],
    };
  
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
  
    render(<CardSalesSummary />);
    expect(screen.getByText("$3m")).toBeInTheDocument();
  });
  
  it("correctly calculates the average change percentage", () => {
    const mockData = {
      salesSummary: [
        { date: "2023-01-01", totalValue: 1000000, changePercentage: 10 },
        { date: "2023-01-02", totalValue: 2000000, changePercentage: 20 },
      ],
    };
  
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
  
    render(<CardSalesSummary />);
    expect(screen.getByText("15.00%")).toBeInTheDocument();
  });
  
  it('correctly displays the date with the highest sales value', () => {
    const mockData = {
      salesSummary: [
        { date: '2023-01-01', totalValue: 1000000, changePercentage: 10 },
        { date: '2023-01-02', totalValue: 2000000, changePercentage: 20 },
      ],
    };
  
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
  
    render(<CardSalesSummary />);
   
    const labelElement = screen.getByText(/Highest Sales Date:/i);
    expect(labelElement).toBeInTheDocument();
   
    const dateElement = screen.getByText('1/1/23');
    expect(dateElement).toBeInTheDocument();
  });
  
  it("handles cases where there is no sales data", () => {
    const mockData = {
      salesSummary: [],
    };
  
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });
  
    render(<CardSalesSummary />);
  
    const highestSalesDateElement = screen.getByText((content, node) => {
      const hasText = (node: Element) => node.textContent === "Highest Sales Date: N/A";
      const nodeHasText = hasText(node!);
      const childrenDontHaveText = Array.from(node!.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
  
    expect(highestSalesDateElement).toBeInTheDocument();
  });
  
});
