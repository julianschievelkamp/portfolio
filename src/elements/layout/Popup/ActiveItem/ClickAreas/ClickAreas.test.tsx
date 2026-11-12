import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioFixtures";
import ClickAreas from "./ClickAreas";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

// Ergebnis der Media Query, pro Test umschaltbar
const mediaQuery = vi.hoisted(() => ({ matches: false }));
vi.mock("hooks/useMediaQuery", () => ({
    useMediaQuery: () => mediaQuery.matches,
}));

const maxIndex = portfolioData.length - 1;

// Die Klickflächen haben weder Rolle noch Label, daher Zugriff über die Reihenfolge
const renderClickAreas = () => {
    const { container } = render(<ClickAreas />);
    const [previous, next] = Array.from(container.children) as HTMLElement[];

    return { container, previous, next };
};

describe("ClickAreas", () => {
    beforeEach(() => {
        mediaQuery.matches = false;
        useStore.setState({ activeIndex: 1, popupOpen: true });
    });

    it("renders the previous and next areas on large screens", () => {
        const { container, previous, next } = renderClickAreas();

        expect(container.children).toHaveLength(2);
        [previous, next].forEach((area) => {
            expect(area).toBeInTheDocument();
        });
    });

    it("hides the areas from assistive technologies", () => {
        const { previous, next } = renderClickAreas();

        [previous, next].forEach((area) => {
            expect(area).toHaveAttribute("aria-hidden", "true");
        });
    });

    it("renders nothing on small landscape screens", () => {
        mediaQuery.matches = true;
        const { container } = render(<ClickAreas />);

        expect(container).toBeEmptyDOMElement();
    });

    it("shows the previous item via the previous area", async () => {
        const { previous } = renderClickAreas();

        await userEvent.click(previous);

        expect(useStore.getState().activeIndex).toBe(0);
        expect(useStore.getState().popupOpen).toBe(true);
    });

    it("shows the next item via the next area", async () => {
        const { next } = renderClickAreas();

        await userEvent.click(next);

        expect(useStore.getState().activeIndex).toBe(2);
        expect(useStore.getState().popupOpen).toBe(true);
    });

    it("wraps around at the start and end of the list", async () => {
        useStore.setState({ activeIndex: 0 });
        const { previous, next } = renderClickAreas();

        await userEvent.click(previous);
        expect(useStore.getState().activeIndex).toBe(maxIndex);

        await userEvent.click(next);
        expect(useStore.getState().activeIndex).toBe(0);
    });

    it("uses custom icon cursors with a pointer fallback", () => {
        const { previous, next } = renderClickAreas();

        [previous, next].forEach((area) => {
            const { cursor } = getComputedStyle(area);
            expect(cursor).toContain("data:image/svg+xml");
            expect(cursor).toContain("pointer");
        });
    });
});
