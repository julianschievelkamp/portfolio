import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";
import { useStore } from "hooks/useStore";

import ClickAreas from "./ClickAreas";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

// The click areas are aria-hidden and therefore only reachable via the container
const renderAreas = () => {
    const { container } = render(<ClickAreas />);
    const [previous, next] = Array.from(container.children) as HTMLElement[];
    return { previous, next };
};

describe("ClickAreas", () => {
    beforeEach(() => {
        useStore.setState({ activeIndex: 1 });
    });

    it("renders a previous and a next area hidden from assistive technology", () => {
        const { next, previous } = renderAreas();

        expect(previous).toHaveAttribute("aria-hidden", "true");
        expect(next).toHaveAttribute("aria-hidden", "true");
    });

    it("goes to the previous item when clicking the previous area", async () => {
        const { previous } = renderAreas();

        await userEvent.click(previous);

        expect(useStore.getState().activeIndex).toBe(0);
    });

    it("goes to the next item when clicking the next area", async () => {
        const { next } = renderAreas();

        await userEvent.click(next);

        expect(useStore.getState().activeIndex).toBe(2);
    });

    it("wraps around at the start and end of the list", async () => {
        const { next, previous } = renderAreas();

        useStore.setState({ activeIndex: 0 });
        await userEvent.click(previous);
        expect(useStore.getState().activeIndex).toBe(portfolioData.length - 1);

        await userEvent.click(next);
        expect(useStore.getState().activeIndex).toBe(0);
    });
});
