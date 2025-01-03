import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./page";
import { useGetSalesDataQuery } from "@/state/api";

jest.mock("@/state/api", () => ({
  useGetSalesDataQuery: jest.fn(),
}));

jest.mock("./components/StatCard", () => {
  return function MockStatCard(props: any) {
    return <div data-testid="stat-card">{props.title}</div>;
  };
});

jest.mock("./components/CardPopularProducts", () => {
  return function MockCardPopularProducts() {
    return <div data-testid="card-popular-products">Popular Products</div>;
  };
});

jest.mock("./components/CardSalesSummary", () => {
  return function MockCardSalesSummary() {
    return <div data-testid="card-sales-summary">Sales Summary</div>;
  };
});

jest.mock("./components/CardGoogleMap", () => {
  return function MockCardGoogleMap(props: any) {
    return (
      <div data-testid="card-google-map">Google Map Data: {props.salesData}</div>
    );
  };
});

jest.mock("./components/CardPurchaseSummary", () => {
  return function MockCardPurchaseSummary() {
    return <div data-testid="card-purchase-summary">Purchase Summary</div>;
  };
});

jest.mock("./components/CardExpenseSummary", () => {
  return function MockCardExpenseSummary() {
    return <div data-testid="card-expense-summary">Expense Summary</div>;
  };
});

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useGetSalesDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Dashboard />);

    expect(screen.getByText("Loading sales data...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetSalesDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Dashboard />);

    expect(screen.getByText("Failed to fetch sales data.")).toBeInTheDocument();
  });

  it("renders stat cards correctly", () => {
    (useGetSalesDataQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<Dashboard />);


    expect(screen.getAllByTestId("stat-card")).toHaveLength(3);
  });

  it("renders all additional cards correctly", () => {
    (useGetSalesDataQuery as jest.Mock).mockReturnValue({
      data: "Mock Sales Data",
      isLoading: false,
      isError: false,
    });

    render(<Dashboard />);

    expect(screen.getByTestId("card-popular-products")).toBeInTheDocument();
    expect(screen.getByTestId("card-sales-summary")).toBeInTheDocument();
    expect(screen.getByTestId("card-google-map")).toHaveTextContent(
      "Google Map Data: Mock Sales Data"
    );
    expect(screen.getByTestId("card-purchase-summary")).toBeInTheDocument();
    expect(screen.getByTestId("card-expense-summary")).toBeInTheDocument();
  });
});
