import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsPage from "./page";

jest.mock("./hooks/useProductSearch", () => ({
  useProductSearch: jest.fn(),
}));

jest.mock("@/state/api", () => ({
  useCreateProductMutation: jest.fn(() => [jest.fn()]),
}));

jest.mock("./components/CreateProductModal", () => {
    const MockCreateProductModal = (props: any) =>
      props.isOpen ? (
        <div data-testid="create-product-modal">
          <button onClick={() => props.onClose()}>Close</button>
          <button
            onClick={() =>
              props.onCreate({
                name: "New Product",
                price: 10,
                stockQuantity: 5,
                rating: 4,
              })
            }
          >
            Create Product
          </button>
        </div>
      ) : null;
  
    MockCreateProductModal.displayName = "MockCreateProductModal";
    return MockCreateProductModal;
  });
  
jest.mock("next/image", () => {
  const MockImage = (props: any) => <img {...props} alt={props.alt || ""} />;
  MockImage.displayName = "MockImage";
  return MockImage;
});

jest.mock("@/app/(components)/Header", () => {
  const MockHeader = (props: any) => (
    <h1 data-testid="header">{props.name}</h1>
  );
  MockHeader.displayName = "MockHeader";
  return MockHeader;
});

jest.mock("@/app/(components)/Rating", () => {
  const MockRating = (props: any) => (
    <div data-testid="rating">{`Rating: ${props.rating}`}</div>
  );
  MockRating.displayName = "MockRating";
  return MockRating;
});

const mockUseProductSearch = require('./hooks/useProductSearch').useProductSearch;

describe("ProductsPage", () => {
  beforeEach(() => {
    mockUseProductSearch.mockReturnValue({
      searchTerm: "",
      handleSearchChange: jest.fn(),
      products: null,
      isLoading: false,
      isError: false,
    });
  });

  it("renders loading state", () => {
    mockUseProductSearch.mockReturnValue({
      searchTerm: "",
      handleSearchChange: jest.fn(),
      products: null,
      isLoading: true,
      isError: false,
    });

    render(<ProductsPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockUseProductSearch.mockReturnValue({
      searchTerm: "",
      handleSearchChange: jest.fn(),
      products: null,
      isLoading: false,
      isError: true,
    });

    render(<ProductsPage />);

    expect(screen.getByText("Failed to fetch products")).toBeInTheDocument();
  });

  it("renders products list", () => {
    mockUseProductSearch.mockReturnValue({
      searchTerm: "",
      handleSearchChange: jest.fn(),
      products: [
        { productId: 1, name: "Product 1", price: 10, stockQuantity: 5, rating: 4 },
        { productId: 2, name: "Product 2", price: 20, stockQuantity: 10, rating: 5 },
      ],
      isLoading: false,
      isError: false,
    });

    render(<ProductsPage />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getAllByTestId("rating").length).toBe(2);
  });

  it("opens and closes the modal", async () => {
    mockUseProductSearch.mockReturnValue({
      searchTerm: "",
      handleSearchChange: jest.fn(),
      products: [],
      isLoading: false,
      isError: false,
    });

    render(<ProductsPage />);

    const createButton = screen.getByText("Create Product");
    fireEvent.click(createButton);

    expect(screen.getByTestId("create-product-modal")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByTestId("create-product-modal")).not.toBeInTheDocument()
    );
  });

  it("handles product creation", async () => {
    const createProductMock = jest.fn();
  
    jest.requireMock("@/state/api").useCreateProductMutation.mockReturnValue([createProductMock]);
  
    mockUseProductSearch.mockReturnValue({
      searchTerm: "",
      handleSearchChange: jest.fn(),
      products: [],
      isLoading: false,
      isError: false,
    });
  
    render(<ProductsPage />);
  
    const createButton = screen.getByText("Create Product", { selector: "button" });
    fireEvent.click(createButton);
  
    const modal = screen.getByTestId("create-product-modal");
    expect(modal).toBeInTheDocument();
  
    const createProductButton = within(modal).getByText("Create Product");
    fireEvent.click(createProductButton);
  
    await waitFor(() =>
      expect(createProductMock).toHaveBeenCalledWith({
        name: "New Product",
        price: 10,
        stockQuantity: 5,
        rating: 4,
      })
    );
  });
  
}); 

