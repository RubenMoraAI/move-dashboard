import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateProductModal from "./CreateProductModal";

describe("CreateProductModal", () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();

  const renderModal = (isOpen = true) =>
    render(
      <CreateProductModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    renderModal();

    expect(screen.getByText("Create New Product")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Stock Quantity")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Rating")).toBeInTheDocument();
  });

  it("does not render when not open", () => {
    renderModal(false);

    expect(screen.queryByText("Create New Product")).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    renderModal();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("validates form fields and displays errors", () => {
    renderModal();

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    expect(screen.getByText("Product name must be at least 3 characters.")).toBeInTheDocument();
    expect(screen.getByText("Price must be a valid number greater than 0.")).toBeInTheDocument();
    expect(
      screen.getByText("Stock quantity must be a non-negative number.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rating must be a number between 0 and 5.")
    ).toBeInTheDocument();
  });

  it("creates a product with valid inputs", () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stock Quantity"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByPlaceholderText("Rating"), {
      target: { value: "4" },
    });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    expect(mockOnCreate).toHaveBeenCalledWith({
      productId: expect.any(String), 
      name: "Test Product",
      price: 100,
      stockQuantity: 10,
      rating: 4,
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("handles invalid inputs gracefully", () => {
    renderModal();

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Te" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "-10" },
    });
    fireEvent.change(screen.getByPlaceholderText("Stock Quantity"), {
      target: { value: "-5" },
    });
    fireEvent.change(screen.getByPlaceholderText("Rating"), {
      target: { value: "6" },
    });

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    expect(screen.getByText("Product name must be at least 3 characters.")).toBeInTheDocument();
    expect(screen.getByText("Price must be a valid number greater than 0.")).toBeInTheDocument();
    expect(
      screen.getByText("Stock quantity must be a non-negative number.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Rating must be a number between 0 and 5.")
    ).toBeInTheDocument();

    expect(mockOnCreate).not.toHaveBeenCalled();
  });
});
