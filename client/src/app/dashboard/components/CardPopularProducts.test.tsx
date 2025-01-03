import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardPopularProducts from "./CardPopularProducts";
import { useGetDashboardMetricsQuery } from "@/state/api";

jest.mock("@/state/api", () => ({
  useGetDashboardMetricsQuery: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || "Mocked Image"} />,
}));

jest.mock("../../(components)/Rating", () => ({
  __esModule: true,
  default: (props: { rating: number }) => <div data-testid="rating">{`Rating: ${props.rating}`}</div>,
}));

describe("CardPopularProducts Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<CardPopularProducts cssProperty="custom-class" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders correctly with popular products data", () => {
    const mockData = {
      popularProducts: [
        {
          productId: 1,
          name: "Product 1",
          price: 100,
          rating: 4.5,
          stockQuantity: 5000,
        },
        {
          productId: 2,
          name: "Product 2",
          price: 200,
          rating: 3.8,
          stockQuantity: 3000,
        },
      ],
    };

    (useGetDashboardMetricsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<CardPopularProducts cssProperty="custom-class" />);

    expect(screen.getByText("Popular Products")).toBeInTheDocument();

    mockData.popularProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      expect(screen.getByText(`Rating: ${product.rating}`)).toBeInTheDocument();
      expect(screen.getByText(`${Math.round(product.stockQuantity / 1000)}k Sold`)).toBeInTheDocument();
    });
  });

  it("applies custom CSS classes", () => {
    render(<CardPopularProducts cssProperty="custom-class" />);

    const container = screen.getByText("Popular Products").closest("div");
    expect(container).toHaveClass("custom-class");
  });
});
