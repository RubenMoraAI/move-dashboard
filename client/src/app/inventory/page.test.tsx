import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InventoryPage from "./page";
 
jest.mock("./components/Inventory", () => {
  return function MockInventory() {
    return <div data-testid="inventory-component">Mocked Inventory Component</div>;
  };
});

describe("InventoryPage", () => {
  it("renders the Inventory component", () => {
    render(<InventoryPage />);
 
    expect(screen.getByTestId("inventory-component")).toBeInTheDocument();
    expect(screen.getByText("Mocked Inventory Component")).toBeInTheDocument();
  });
});
