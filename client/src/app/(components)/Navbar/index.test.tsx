import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import Navbar from "./index";


jest.mock("@/state/redux", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));


jest.mock("./components/ThemeToggle", () => {
    const MockThemeToggle = ({ isDarkMode, toggleDarkMode }: any) => (
        <div data-testid="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
        </div>
    );
    MockThemeToggle.displayName = "ThemeToggle"; 
    return MockThemeToggle;
});

jest.mock("./components/UserMenu", () => {
    const MockUserMenu = () => <div data-testid="user-menu">User Menu</div>;
    MockUserMenu.displayName = "UserMenu"; 
    return MockUserMenu;
});

jest.mock("./components/WelcomeTitle", () => {
    const MockWelcomeTitle = () => <div data-testid="welcome-title">Welcome Title</div>;
    MockWelcomeTitle.displayName = "WelcomeTitle"; 
    return MockWelcomeTitle;
});
describe("Navbar Component", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        jest.clearAllMocks();
    });

    it("renders all components correctly", () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                global: {
                    isSidebarCollapsed: false,
                    isDarkMode: false,
                },
            })
        );

        render(<Navbar />);

        
        expect(screen.getByRole("button")).toBeInTheDocument();

        
        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
        expect(screen.getByTestId("user-menu")).toBeInTheDocument();
        expect(screen.getByTestId("welcome-title")).toBeInTheDocument();

        
        expect(screen.getByText("7")).toBeInTheDocument();
    });

    it("dispatches action to toggle sidebar collapse", () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                global: {
                    isSidebarCollapsed: false,
                    isDarkMode: false,
                },
            })
        );

        render(<Navbar />);

        const sidebarButton = screen.getByRole("button");
        fireEvent.click(sidebarButton);

        expect(mockDispatch).toHaveBeenCalledWith({ type: "global/setIsSidebarCollapsed", payload: true });
    });

    it("dispatches action to toggle dark mode", () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                global: {
                    isSidebarCollapsed: false,
                    isDarkMode: false,
                },
            })
        );

        render(<Navbar />);

        const themeToggle = screen.getByTestId("theme-toggle");
        fireEvent.click(themeToggle);

        expect(mockDispatch).toHaveBeenCalledWith({ type: "global/setIsDarkMode", payload: true });
    });

    it("shows dark mode when isDarkMode is true", () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                global: {
                    isSidebarCollapsed: false,
                    isDarkMode: true,
                },
            })
        );

        render(<Navbar />);

        expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    });

    it("shows light mode when isDarkMode is false", () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                global: {
                    isSidebarCollapsed: false,
                    isDarkMode: false,
                },
            })
        );

        render(<Navbar />);

        expect(screen.getByText("Light Mode")).toBeInTheDocument();
    });
});
