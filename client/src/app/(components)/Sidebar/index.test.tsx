import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./index";
import * as reduxHooks from "@/state/redux";
import { setIsSidebarCollapsed } from "@/state";  
import { useAppSelector } from '@/state/redux';
jest.mock("next/link", () => {
  const MockLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

jest.mock("next/image", () => {
  const MockImage = (props: any) => <img {...props} alt={props.alt || ""} />;
  MockImage.displayName = "MockImage";
  return MockImage;
});

jest.mock("@/state/redux", () => {
  const actualRedux = jest.requireActual("@/state/redux");
  return {
    ...(typeof actualRedux === 'object' ? actualRedux : {}),
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
  };
});

jest.mock("./components/SidebarLink", () => {
  const MockSidebarLink = ({ label }: { label: string }) => (
    <div data-testid="sidebar-link">{label}</div>
  );
  MockSidebarLink.displayName = "MockSidebarLink";
  return MockSidebarLink;
});

jest.mock("./components/SidebarGroupTitle", () => {
  const MockSidebarGroupTitle = ({ title }: { title: string }) => (
    <div data-testid="sidebar-group-title">{title}</div>
  );
  MockSidebarGroupTitle.displayName = "MockSidebarGroupTitle";
  return MockSidebarGroupTitle;
});

const mockedUseAppSelector = reduxHooks.useAppSelector as jest.Mock;
const mockedUseAppDispatch = reduxHooks.useAppDispatch as jest.Mock;
 
describe("Sidebar Component", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAppSelector.mockImplementation((selector) => {
      if ((selector as Function).toString().includes("isSidebarCollapsed")) return false;
      return false;
    });
    mockedUseAppDispatch.mockReturnValue(dispatchMock);


    process.env.NEXT_PUBLIC_APP_NAME = "Test App";
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders the sidebar with all groups and links", () => {
    render(<Sidebar />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getAllByTestId("sidebar-group-title").length).toBe(2)
    expect(screen.getAllByTestId("sidebar-link").length).toBe(7)
  });

  it("toggles the sidebar collapsed state", () => {
    render(<Sidebar />);

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(dispatchMock).toHaveBeenCalledWith(setIsSidebarCollapsed(true));
  });

  it("renders the collapsed sidebar correctly", () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if ((selector as Function).toString().includes("isSidebarCollapsed")) return true;
      return false;
    });

    render(<Sidebar />);

    const appName = screen.queryByText(process.env.NEXT_PUBLIC_APP_NAME || "");
    expect(appName).toHaveClass("hidden");
  });

  it("shows the documentation card when not collapsed", () => {
    render(<Sidebar />);

    expect(screen.getByText("Need help?")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
  });

  it("does not show the documentation card when collapsed", () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if ((selector as Function).toString().includes("isSidebarCollapsed")) return true;
      return false;
    });

    render(<Sidebar />);

    expect(screen.queryByText("Need help?")).not.toBeInTheDocument();
    expect(screen.queryByText("Documentation")).not.toBeInTheDocument();
  });

  it("renders the upgrade to pro section when not collapsed", () => {
    render(<Sidebar />);

    expect(screen.getByText("Upgrade to Pro")).toBeInTheDocument();
  });

  it("does not render the upgrade to pro section when collapsed", () => {
    mockedUseAppSelector.mockImplementation((selector) => {
      if ((selector as Function).toString().includes("isSidebarCollapsed")) return true;
      return false;
    });

    render(<Sidebar />);

    expect(screen.queryByText("Upgrade to Pro")).not.toBeInTheDocument();
  });

  it('renders expanded sidebar when isSidebarCollapsed is false', () => {

    (useAppSelector as jest.Mock).mockReturnValue(false);

    render(<Sidebar />);


    expect(screen.getByText('Main Menu')).toBeInTheDocument();
    expect(screen.getByText('Premium Features')).toBeInTheDocument();

  });

  it('renders collapsed sidebar when isSidebarCollapsed is true', () => {
    (useAppSelector as jest.Mock).mockReturnValue(true);
  
    render(<Sidebar />);
  
    
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('w-0 md:w-16');
  
    
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
    expect(screen.getByText('Premium Features')).toBeInTheDocument();
  });
  
});
