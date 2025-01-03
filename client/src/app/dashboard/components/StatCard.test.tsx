import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatCard from "./StatCard";
import { LucideIcon } from "lucide-react";

const MockIcon: LucideIcon = Object.assign(
  (props: any) => <svg data-testid="mock-icon" {...props} />,
  { $$typeof: Symbol.for("react.forward_ref") }
);

describe("StatCard Component", () => {
  const mockProps = {
    title: "Test Stat Card",
    primaryIcon: <MockIcon />,
    dateRange: "22 - 29 October 2023",
    details: [
      {
        title: "Test Detail 1",
        amount: "$100",
        changePercentage: 20,
        IconComponent: MockIcon,
      },
      {
        title: "Test Detail 2",
        amount: "$50",
        changePercentage: -10,
        IconComponent: MockIcon,
      },
    ],
    cssProperty: "custom-css",
  };

  it("renders the component with correct title and date range", () => {
    render(<StatCard {...mockProps} />);


    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.dateRange)).toBeInTheDocument();
  });

  it("renders the primary icon", () => {
    render(<StatCard {...mockProps} />);
  
    const icons = screen.getAllByTestId("mock-icon"); 
    expect(icons[0]).toBeInTheDocument();
  });

  it("renders all detail items with correct data", () => {
    render(<StatCard {...mockProps} />);


    mockProps.details.forEach((detail) => {
      expect(screen.getByText(detail.title)).toBeInTheDocument();
      expect(screen.getByText(detail.amount)).toBeInTheDocument();
      expect(
        screen.getByText(`${detail.changePercentage > 0 ? "+" : ""}${detail.changePercentage}%`)
      ).toBeInTheDocument();
    });
  });

  it("applies the correct styles for positive and negative percentages", () => {
    render(<StatCard {...mockProps} />);


    const positivePercentage = screen.getByText("+20%");
    expect(positivePercentage).toHaveClass("text-green-500", "dark:text-green-400");


    const negativePercentage = screen.getByText("-10%");
    expect(negativePercentage).toHaveClass("text-red-500", "dark:text-red-400");
  });

  it("renders dividers between detail items except the last one", () => {
    render(<StatCard {...mockProps} />);
  
    
    const detailElements = mockProps.details.map((detail) =>
      screen.getByText(detail.title).closest("div")
    );
  
    
    detailElements.forEach((detailElement, index) => {
      if (index < mockProps.details.length - 1) {
        
        const divider = detailElement?.nextElementSibling;
        expect(divider?.tagName).toBe("HR");
      }
    });
  });
  
  

  it("applies custom CSS classes", () => {
    const { container } = render(<StatCard {...mockProps} />);


    expect(container.firstChild).toHaveClass(mockProps.cssProperty);
  });
});
