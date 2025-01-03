import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useProductSearch } from "./useProductSearch";
import { useGetProductsQuery } from "@/state/api";

jest.mock("@/state/api", () => ({
  useGetProductsQuery: jest.fn(() => ({
    data: null,
    isLoading: false,
    isError: false,
  })),
}));

function TestComponent() {
  const {
    searchTerm,
    handleSearchChange,
    products,
    isLoading,
    isError,
  } = useProductSearch();

  return (
    <div>
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {isLoading && <div data-testid="loading">Loading...</div>}
      {isError && <div data-testid="error">Error fetching products</div>}
      {products && (
        <ul data-testid="products-list">
          {products.map((product: any) => (
            <li key={product.productId}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

describe("useProductSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default state", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("search-input")).toHaveValue("");
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("products-list")).not.toBeInTheDocument();
  });

  it("updates `searchTerm` on input change", () => {
    render(<TestComponent />);

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  it("debounces `searchTerm` and fetches products", async () => {
    jest.useFakeTimers();

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: [{ productId: 1, name: "Test Product" }],
      isLoading: false,
      isError: false,
    });

    render(<TestComponent />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "testing" } });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );
  });

  it("shows error state when API call fails", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<TestComponent />);

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("cleans up debounced timeout on unmount", () => {
    jest.useFakeTimers();

    const { unmount } = render(<TestComponent />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "testing" } });

    unmount();

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(useGetProductsQuery).not.toHaveBeenCalledWith("testing");
  });
});
