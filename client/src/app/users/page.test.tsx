import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UsersPage from "./page";

jest.mock("./components/Users", () => {
  const MockedUsersComponent = () => <div>Mocked Users Component</div>;
  MockedUsersComponent.displayName = "MockedUsersComponent";
  return MockedUsersComponent;
});

describe("UsersPage", () => {
  it("renders the UsersPage component without crashing", () => {
    render(<UsersPage />);
 
    expect(screen.getByText("Mocked Users Component")).toBeInTheDocument();
  });

  it("contains the Users component", () => {
    render(<UsersPage />);
 
    expect(screen.getByText("Mocked Users Component")).toBeTruthy();
  });
});
