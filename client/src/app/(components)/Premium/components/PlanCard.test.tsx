import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlanCard from "./PlanCard";
import { useConfetti } from "@/context/ConfettiContext";


jest.mock("@/context/ConfettiContext", () => ({
  useConfetti: jest.fn(),
}));

describe("PlanCard Component", () => {
  const mockTriggerConfetti = jest.fn();

  beforeEach(() => {
    (useConfetti as jest.Mock).mockReturnValue({
      triggerConfetti: mockTriggerConfetti,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    name: "Pro Plan",
    popular: true,
    monthlyPrice: "$20",
    annualPrice: "$200",
    period: "per month",
    description: "This is the best plan for professionals.",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    buttonText: "Choose Plan",
    trial: "7-day free trial",
    includeText: "Includes these features:",
    billingCycle: "Monthly",
    buttonStyle: "primary" as const,
  };

  it("renders the plan card with all details", () => {
    render(<PlanCard {...defaultProps} />);

    
    expect(screen.getByText("Pro Plan")).toBeInTheDocument();
    expect(screen.getByText("This is the best plan for professionals.")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByText("per month")).toBeInTheDocument();

    
    defaultProps.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    
    expect(screen.getByText("Choose Plan")).toBeInTheDocument();
    expect(screen.getByText("7-day free trial")).toBeInTheDocument();
  });

  it("renders the 'Popular' badge when the plan is marked as popular", () => {
    render(<PlanCard {...defaultProps} popular={true} />);

    expect(screen.getByText("Popular")).toBeInTheDocument();
  });

  it("does not render the 'Popular' badge when the plan is not popular", () => {
    render(<PlanCard {...defaultProps} popular={false} />);

    expect(screen.queryByText("Popular")).not.toBeInTheDocument();
  });

  it("applies the correct button styles for primary, outline, and disabled styles", () => {
    
    const { rerender } = render(<PlanCard {...defaultProps} buttonStyle="primary" />);
    let button = screen.getByText("Choose Plan");
    expect(button).toHaveClass("bg-indigo-500 text-white");
  
    
    rerender(<PlanCard {...defaultProps} buttonStyle="outline" />);
    button = screen.getByText("Choose Plan");
    expect(button).toHaveClass("border-2 border-indigo-500 text-indigo-500");
  
    
    rerender(<PlanCard {...defaultProps} buttonStyle="disabled" />);
    button = screen.getByText("Choose Plan");
    expect(button).toHaveClass("bg-gray-100 text-gray-500");
    expect(button).toBeDisabled();
  });
  

  it("triggers confetti when the button is clicked and not disabled", () => {
    render(<PlanCard {...defaultProps} buttonStyle="primary" />);

    const button = screen.getByText("Choose Plan");
    fireEvent.click(button);

    expect(mockTriggerConfetti).toHaveBeenCalled();
  });

  it("does not trigger confetti when the button is disabled", () => {
    render(<PlanCard {...defaultProps} buttonStyle="disabled" />);

    const button = screen.getByText("Choose Plan");
    fireEvent.click(button);

    expect(mockTriggerConfetti).not.toHaveBeenCalled();
  });

  it("displays the correct price based on billing cycle", () => {
    
    render(<PlanCard {...defaultProps} billingCycle="Monthly" />);
    expect(screen.getByText("$20")).toBeInTheDocument();

    
    render(<PlanCard {...defaultProps} billingCycle="Annual" />);
    expect(screen.getByText("$200")).toBeInTheDocument();
  });

  it('getButtonClass returns an empty string for invalid buttonStyle', () => {
    
    render(
      <PlanCard
        name="Basic Plan"
        monthlyPrice="$10"
        annualPrice="$100"
        period="per month"
        description="A basic plan"
        features={['Feature 1', 'Feature 2']}
        buttonText="Subscribe"
        trial="7-day free trial"
        includeText="Includes:"
        billingCycle="Monthly"
        buttonStyle={"invalid" as any} 
      />
    );
  
    
    const buttonElement = screen.getByRole('button', { name: /subscribe/i });
  
    
    expect(buttonElement).not.toHaveClass('bg-gray-100 text-gray-500 cursor-not-allowed');
    expect(buttonElement).not.toHaveClass('border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white');
    expect(buttonElement).not.toHaveClass('bg-indigo-500 text-white hover:bg-indigo-600');
  });
  
});
