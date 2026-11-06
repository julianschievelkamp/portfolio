import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Div from ".";

describe("Div", () => {
    it("renders its children", () => {
        render(<Div>Content</Div>);

        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("applies default position and max width", () => {
        render(<Div>Content</Div>);

        expect(screen.getByText("Content")).toHaveStyle({
            position: "relative",
            maxWidth: "100%",
        });
    });

    it.each([
        ["display", "flex"],
        ["flexDirection", "column"],
        ["justifyContent", "center"],
        ["alignItems", "center"],
        ["flexWrap", "wrap"],
        ["margin", "16px"],
        ["padding", "32px"],
        ["width", "50%"],
        ["maxWidth", "80%"],
        ["minHeight", "160px"],
        ["overflow", "hidden"],
        ["position", "absolute"],
    ] as const)("applies the %s prop", (prop, value) => {
        render(<Div {...{ [prop]: value }}>Content</Div>);

        expect(screen.getByText("Content")).toHaveStyle({ [prop]: value });
    });

    it("applies zIndex and opacity", () => {
        render(
            <Div zIndex={5} opacity={0.5}>
                Content
            </Div>,
        );

        expect(screen.getByText("Content")).toHaveStyle({
            zIndex: "5",
            opacity: "0.5",
        });
    });

    it("calls onClick on click", async () => {
        const onClick = vi.fn();
        render(<Div onClick={onClick}>Content</Div>);

        await userEvent.click(screen.getByText("Content"));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("passes className through", () => {
        render(<Div className="custom">Content</Div>);

        expect(screen.getByText("Content")).toHaveClass("custom");
    });
});
