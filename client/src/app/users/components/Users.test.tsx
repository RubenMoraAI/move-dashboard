import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Users from "./Users";
import { useGetUsersQuery } from "@/state/api";

jest.mock("@/state/api", () => ({
  useGetUsersQuery: jest.fn(),
}));

jest.mock("@/app/(components)/DataGridWrapper/DataGridWrapper", () => {
  const MockDataGridWrapper = (props: any) => (
    <div data-testid="data-grid-wrapper">
      <h1>{props.title}</h1>
      {props.rows.map((row: any) => (
        <div key={row.userId}>{row.name}</div>
      ))}
    </div>
  );
  MockDataGridWrapper.displayName = "MockDataGridWrapper";
  return MockDataGridWrapper;
});

describe("Users Component", () => {
  it("renders loading state", () => {
    (useGetUsersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Users />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetUsersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Users />);

    expect(
      screen.getByText("Failed to fetch users")
    ).toBeInTheDocument();
  });

  it("renders users data", () => {
    const mockNames = ["John Doe", "Jane Smith"];
    const mockUsers = [
      { userId: 1, name: mockNames[0], email: "john@example.com", latitude: 10, longitude: 20 },
      { userId: 2, name: mockNames[1], email: "jane@example.com", latitude: 30, longitude: 40 },
    ];

    (useGetUsersQuery as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      isError: false,
    });

    render(<Users />);

    expect(screen.getByTestId("data-grid-wrapper")).toBeInTheDocument();

    expect(screen.getByText(mockNames[0])).toBeInTheDocument();
    expect(screen.getByText(mockNames[1])).toBeInTheDocument();
  });
});
