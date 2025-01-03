import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inventory from "./Inventory";
import { useGetProductsQuery } from "@/state/api"; 

jest.mock("@/state/api", () => ({
  useGetProductsQuery: jest.fn(),
}));


jest.mock("../../(components)/DataGridWrapper/DataGridWrapper", () => {
  return function MockDataGridWrapper(props: any) {
    return (
      <div data-testid="data-grid-wrapper">
        <h1>{props.title}</h1>
        <div>Mocked Rows: {props.rows.length}</div>
        <div>Mocked Columns: {props.columns.length}</div>
      </div>
    );
  };
});


jest.mock("@mui/material", () => ({
  useMediaQuery: jest.fn(),
}));

describe("Inventory Component", () => {
  const mockUseMediaQuery = require("@mui/material").useMediaQuery;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Inventory />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Inventory />);

    expect(screen.getByText("Failed to fetch products")).toBeInTheDocument();
  });

  it("renders DataGridWrapper with products", () => {
    const mockProducts = [
      { productId: 1, name: "Product 1", price: 100, rating: 4, stockQuantity: 600000 },
      { productId: 2, name: "Product 2", price: 50, rating: 3, stockQuantity: 400000 },
    ];

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    mockUseMediaQuery.mockReturnValue(false); 

    render(<Inventory />);

    expect(screen.getByTestId("data-grid-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
    expect(screen.getByText("Mocked Rows: 2")).toBeInTheDocument();
    expect(screen.getByText("Mocked Columns: 5")).toBeInTheDocument(); 
  });

  it("filters columns for medium screens", () => {
    const mockProducts = [
      { productId: 1, name: "Product 1", price: 100, rating: 4, stockQuantity: 600000 },
      { productId: 2, name: "Product 2", price: 50, rating: 3, stockQuantity: 400000 },
    ];

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });

    mockUseMediaQuery.mockReturnValue(true); 

    render(<Inventory />);

    expect(screen.getByTestId("data-grid-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
    expect(screen.getByText("Mocked Rows: 2")).toBeInTheDocument();
    expect(screen.getByText("Mocked Columns: 3")).toBeInTheDocument(); 
  });
});
