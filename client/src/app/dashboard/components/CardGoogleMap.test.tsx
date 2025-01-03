import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import CardGoogleMap from "./CardGoogleMap";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@react-google-maps/api", () => ({
    useLoadScript: jest.fn(),
    GoogleMap: jest.fn(({ children }: { children: React.ReactNode }) => (
      <div data-testid="google-map">{children}</div>
    )),
    MarkerClusterer: jest.fn(({ children }: { children: (clusterer: any) => React.ReactNode }) => (
      <div data-testid="marker-clusterer">{children({})}</div>
    )),
    Marker: jest.fn((props: { position: { lat: number; lng: number } }) => (
      <div data-testid="marker">{`Lat: ${props.position.lat}, Lng: ${props.position.lng}`}</div>
    )),
  }));

const mockedUseSelector = useSelector as unknown as jest.Mock;
const mockedUseLoadScript = useLoadScript as jest.Mock;

describe("CardGoogleMap Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when map script is not loaded", () => {
    mockedUseLoadScript.mockReturnValue({ isLoaded: false });
    mockedUseSelector.mockReturnValue(false);

    render(<CardGoogleMap cssProperty="custom-class" />);

    expect(screen.getByText("Loading Map...")).toBeInTheDocument();
  });

  it("renders map with markers when sales data is provided", () => {
    const mockSalesData = [
      { saleId: "1", latitude: "40.7128", longitude: "-74.006", totalAmount: 100, productId: "p1", quantity: 1, unitPrice: 100 },
      { saleId: "2", latitude: "34.0522", longitude: "-118.2437", totalAmount: 200, productId: "p2", quantity: 2, unitPrice: 100 },
    ];
  
    mockedUseLoadScript.mockReturnValue({ isLoaded: true });
    mockedUseSelector.mockReturnValue(false);
  
    render(<CardGoogleMap salesData={mockSalesData} />);
  
    expect(screen.getByTestId("google-map")).toBeInTheDocument();
    expect(screen.getByTestId("marker-clusterer")).toBeInTheDocument();
  
    const markers = screen.getAllByTestId("marker");
    expect(markers.length).toBe(mockSalesData.length);
  
    expect(markers[0]).toHaveTextContent("Lat: 40.7128, Lng: -74.006");
    expect(markers[1]).toHaveTextContent("Lat: 34.0522, Lng: -118.2437");
  });
});
