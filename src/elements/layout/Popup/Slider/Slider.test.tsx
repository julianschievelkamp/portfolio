import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";
import { useStore } from "hooks/useStore";

import Slider from "./Slider";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

// The slider offset reveals the selected index
const getTransform = (container: HTMLElement) =>
    getComputedStyle(container.firstElementChild?.firstElementChild as Element)
        .transform;

describe("Slider", () => {
    beforeEach(() => {
        useStore.setState({ activeIndex: 0 });
    });

    it("renders the items as a list", () => {
        render(<Slider />);

        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(
            portfolioData.length,
        );
    });

    it("selects an item on click", async () => {
        render(<Slider />);

        await userEvent.click(
            screen.getByRole("button", {
                name: `Show ${portfolioData[2].title}`,
            }),
        );

        expect(useStore.getState().activeIndex).toBe(2);
    });

    it("keeps only the current item in the tab order", () => {
        render(<Slider />);

        const buttons = screen.getAllByRole("button");

        expect(buttons[0]).toHaveAttribute("tabindex", "0");
        buttons
            .slice(1)
            .forEach((button) =>
                expect(button).toHaveAttribute("tabindex", "-1"),
            );
    });

    it("moves the slider when the current item changes", () => {
        const { container } = render(<Slider />);
        const before = getTransform(container);

        act(() => useStore.setState({ activeIndex: 1 }));

        expect(getTransform(container)).not.toBe(before);
    });

    it("moves aria-current and the tab stop to the new item when the index changes", () => {
        render(<Slider />);
        const buttons = screen.getAllByRole("button");

        act(() => useStore.setState({ activeIndex: 1 }));

        expect(buttons[0]).toHaveAttribute("aria-current", "false");
        expect(buttons[0]).toHaveAttribute("tabindex", "-1");
        expect(buttons[1]).toHaveAttribute("aria-current", "true");
        expect(buttons[1]).toHaveAttribute("tabindex", "0");
    });
});
