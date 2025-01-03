import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Rating from "./index";

describe("Rating Component", () => {
  it("renders 5 stars", () => {
    render(<Rating rating={0} />);
    const stars = screen.getAllByRole("img");
    expect(stars).toHaveLength(5);
  });

  it("renders stars with the correct colors based on the rating", () => {
    render(<Rating rating={3} />);
    const stars = screen.getAllByRole("img");

    stars.slice(0, 3).forEach((star) => {
      expect(star).toHaveAttribute("fill", "#FFC107");
    });

    stars.slice(3).forEach((star) => {
      expect(star).toHaveAttribute("fill", "#E4E5E9");
    });
  });

  it("renders no filled stars when rating is 0", () => {
    render(<Rating rating={0} />);
    const stars = screen.getAllByRole("img");

    stars.forEach((star) => {
      expect(star).toHaveAttribute("fill", "#E4E5E9");
    });
  });

  it("renders all filled stars when rating is 5", () => {
    render(<Rating rating={5} />);
    const stars = screen.getAllByRole("img");

    stars.forEach((star) => {
      expect(star).toHaveAttribute("fill", "#FFC107");
    });
  });

  it("handles fractional ratings (rounds down)", () => {
    render(<Rating rating={3.7} />);
    const stars = screen.getAllByRole("img");

    stars.slice(0, 3).forEach((star) => {
      expect(star).toHaveAttribute("fill", "#FFC107");
    });

    stars.slice(3).forEach((star) => {
      expect(star).toHaveAttribute("fill", "#E4E5E9");
    });
  });
});
