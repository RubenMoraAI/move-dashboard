import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SidebarGroupTitle } from "./SidebarGroupTitle";
import { Lock } from "lucide-react";

describe("SidebarGroupTitle Component", () => {
    it("renders the title when not collapsed", () => {
        render(<SidebarGroupTitle title="Group Title" isCollapsed={false} />);

        const titleElement = screen.getByText("Group Title");
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveClass("text-md text-gray-400");
    });

    it("renders the icon when provided and not collapsed", () => {
        render(
            <SidebarGroupTitle
                title="Group Title"
                isCollapsed={false}
                icon={Lock}
            />
        );

        const iconElement = screen.getByRole("img");
        expect(iconElement).toHaveClass("w-5 h-5 text-gray-400");
    });

    it("does not render the title or icon when collapsed", () => {
        render(
            <SidebarGroupTitle
                title="Group Title"
                isCollapsed={true}
                icon={Lock}
            />
        );

        const titleElement = screen.queryByText("Group Title");
        expect(titleElement).not.toBeInTheDocument();

        const iconElement = screen.queryByRole("img");
        expect(iconElement).not.toBeInTheDocument();
    });

    it("applies correct classes when not collapsed", () => {
        render(<SidebarGroupTitle title="Group Title" isCollapsed={false} />);

        const rootDiv = screen.getByText("Group Title").closest("div");
        expect(rootDiv).toHaveClass("flex items-center gap-3");
    });
});
