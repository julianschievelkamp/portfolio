import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { portfolioData, getAltText } from "data/portfolioFixtures";
import Slider from "./Slider";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

// jsdom kennt :focus-visible nicht zuverlässig, daher wird matches gesteuert
const mockFocusVisible = (value: boolean) =>
    vi
        .spyOn(Element.prototype, "matches")
        .mockImplementation((selector) =>
            selector === ":focus-visible" ? value : false,
        );

// Die Verschiebung des Sliders verrät den ausgewählten Index
const getTransform = (container: HTMLElement) =>
    getComputedStyle(container.firstElementChild?.firstElementChild as Element)
        .transform;

const getThirdButton = () =>
    screen.getByRole("button", { name: `Show ${portfolioData[2].title}` });

describe("Slider", () => {
    beforeEach(() => {
        useStore.setState({ activeIndex: 0 });
    });

    it("renders a labelled button with a matching image for every item", () => {
        render(<Slider />);

        portfolioData.forEach((item) => {
            const button = screen.getByRole("button", { name: `Show ${item.title}` });

            expect(button).toContainElement(
                screen.getByRole("img", { name: getAltText(item) }),
            );
        });
    });

    it("renders the items as a list", () => {
        render(<Slider />);

        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(
            portfolioData.length,
        );
    });

    it("loads all thumbnails lazily", () => {
        render(<Slider />);

        screen.getAllByRole("img").forEach((image) => {
            expect(image).toHaveAttribute("loading", "lazy");
        });
    });

    it("selects an item on click", async () => {
        render(<Slider />);

        await userEvent.click(
            screen.getByRole("button", { name: `Show ${portfolioData[2].title}` }),
        );

        expect(useStore.getState().activeIndex).toBe(2);
    });

    it("highlights only the current item", () => {
        useStore.setState({ activeIndex: 1 });
        render(<Slider />);

        const images = screen.getAllByRole("img");

        expect(images[1]).toHaveStyle("opacity: 1");
        expect(images[0]).toHaveStyle("opacity: 0.5");
        expect(images[2]).toHaveStyle("opacity: 0.5");
    });

    it("moves the slider to a tab-focused item", () => {
        const { container } = render(<Slider />);
        const before = getTransform(container);
        const button = getThirdButton();
        mockFocusVisible(true);

        fireEvent.focus(button);

        expect(getTransform(container)).not.toBe(before);
    });

    it("ignores focus that is not focus-visible", () => {
        const { container } = render(<Slider />);
        const before = getTransform(container);
        const button = getThirdButton();
        mockFocusVisible(false);

        fireEvent.focus(button);

        expect(getTransform(container)).toBe(before);
    });

    it("drops the tab focus once the current item changes", () => {
        const { container } = render(<Slider />);
        const button = getThirdButton();
        const images = screen.getAllByRole("img");
        mockFocusVisible(true);

        fireEvent.focus(button);
        const focused = getTransform(container);

        act(() => useStore.setState({ activeIndex: 1 }));

        expect(getTransform(container)).not.toBe(focused);
        expect(images[1]).toHaveStyle("opacity: 1");
    });
});
