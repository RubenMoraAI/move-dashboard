import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; import { useRouter, usePathname } from "next/navigation";
import SidebarLink from "./SidebarLink";
import { Lock } from "lucide-react";

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}));

describe("SidebarLink Component", () => {
    const mockUseRouter = useRouter as jest.Mock;
    const mockUsePathname = usePathname as jest.Mock;
    const mockPush = jest.fn();

    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the link with label and icon", () => {
        render(
            <SidebarLink
                href="/dashboard"
                icon={Lock}
                label="Dashboard"
                isCollapsed={false}
            />
        );

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    });

    it("shows the lock icon if isLocked is true and isCollapsed is false", () => {
        render(
            <SidebarLink
                href="/dashboard"
                icon={Lock}
                label="Dashboard"
                isCollapsed={false}
                isLocked
            />
        );

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        const lockIcon = screen.getByRole("locked", { hidden: true });
        expect(lockIcon).toHaveClass("w-5 h-5 text-gray-500 dark:text-gray-400");
    });

    it("does not show the lock icon if isCollapsed is true", () => {
        render(
            <SidebarLink
                href="/dashboard"
                icon={Lock}
                label="Dashboard"
                isCollapsed
                isLocked
            />
        );

        const lockIcon = screen.queryByRole("img", { hidden: true });
        expect(lockIcon).not.toBeInTheDocument();
    });

    it("redirects to Premium page for specific routes", () => {
        render(
            <SidebarLink
                href="/reports"
                icon={Lock}
                label="Reports"
                isCollapsed={false}
            />
        );

        fireEvent.click(screen.getByRole("link"));

        expect(mockPush).toHaveBeenCalledWith("/Premium");
    });

    it("does not redirect to Premium page for other routes", () => {
        render(
            <SidebarLink
                href="/dashboard"
                icon={Lock}
                label="Dashboard"
                isCollapsed={false}
            />
        );

        fireEvent.click(screen.getByRole("link"));

        expect(mockPush).not.toHaveBeenCalledWith("/Premium");
    });

    it("applies active styling when pathname matches href", () => {
        mockUsePathname.mockReturnValue("/dashboard");

        render(
            <SidebarLink
                href="/dashboard"
                icon={Lock}
                label="Dashboard"
                isCollapsed={false}
            />
        );

        const linkElement = screen.getByRole("link");
        expect(linkElement.firstChild).toHaveClass("bg-indigo-200");
        expect(linkElement.firstChild).toHaveClass("text-gray-700");
    });

    it("does not apply active styling when pathname does not match href", () => {
        mockUsePathname.mockReturnValue("/other-path");

        render(
            <SidebarLink
                href="/dashboard"
                icon={Lock}
                label="Dashboard"
                isCollapsed={false}
            />
        );

        const linkElement = screen.getByRole("link");
        expect(linkElement.firstChild).not.toHaveClass("bg-indigo-200");
        expect(linkElement.firstChild).not.toHaveClass("text-gray-700");
    });
});
