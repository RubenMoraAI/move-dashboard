import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle Component", () => {
  const mockToggleDarkMode = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    isDarkMode: false,
    toggleDarkMode: mockToggleDarkMode,
  };

  it("renders the Sun icon when isDarkMode is false", () => {
    render(<ThemeToggle {...defaultProps} />);

    const sunIcon = screen.getByRole("img", { hidden: true });
    expect(sunIcon).toBeInTheDocument();
  });

  it("renders the Moon icon when isDarkMode is true", () => {
    render(<ThemeToggle {...defaultProps} isDarkMode={true} />);

    const moonIcon = screen.getByRole("img", { hidden: true });
    expect(moonIcon).toBeInTheDocument();
  });

  it("applies the translate-x-1 class when isDarkMode is false", () => {
    render(<ThemeToggle {...defaultProps} />);

    const toggle = screen.getByRole("button");
    const toggleIndicator = toggle.querySelector("div");

    expect(toggleIndicator).toHaveClass("translate-x-1");
  });

  it("applies the translate-x-6 class when isDarkMode is true", () => {
    render(<ThemeToggle {...defaultProps} isDarkMode={true} />);

    const toggle = screen.getByRole("button");
    const toggleIndicator = toggle.querySelector("div");

    expect(toggleIndicator).toHaveClass("translate-x-6");
  });

  it("calls toggleDarkMode when the button is clicked", () => {
    render(<ThemeToggle {...defaultProps} />);

    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);

    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });
});
