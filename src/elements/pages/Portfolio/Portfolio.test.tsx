import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { portfolioData, getAltText } from "data/portfolioFixtures";
import Portfolio from "./Portfolio";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);
vi.mock("elements/layout/Popup/Popup", () => ({
    default: () => <div data-testid="popup" />,
}));

describe("Portfolio", () => {
    beforeEach(() => {
        useStore.setState({
            activeIndex: 0,
            popupOpen: false,
            sidebarOpen: false,
        });
        vi.mocked(useMediaQuery).mockReturnValue(true);
    });

    it("renders a labelled button with a matching image for every item", () => {
        render(<Portfolio />);

        portfolioData.forEach((item) => {
            expect(
                screen.getByRole("button", { name: item.title }),
            ).toContainElement(
                screen.getByRole("img", { name: getAltText(item) }),
            );
        });
    });

    it("selects the item and opens the popup on click", async () => {
        render(<Portfolio />);

        await userEvent.click(
            screen.getByRole("button", { name: portfolioData[2].title }),
        );

        expect(useStore.getState().activeIndex).toBe(2);
        expect(useStore.getState().popupOpen).toBe(true);
    });

    it("opens the popup with the keyboard", async () => {
        render(<Portfolio />);

        await userEvent.tab();
        await userEvent.keyboard("{Enter}");

        expect(useStore.getState().activeIndex).toBe(0);
        expect(useStore.getState().popupOpen).toBe(true);
    });

    it("makes the items focusable by default", () => {
        render(<Portfolio />);

        screen.getAllByRole("button").forEach((button) => {
            expect(button).toHaveAttribute("tabindex", "0");
        });
    });

    it("removes the items from tab navigation with an open sidebar on mobile", () => {
        useStore.setState({ sidebarOpen: true });
        vi.mocked(useMediaQuery).mockReturnValue(false);
        render(<Portfolio />);

        screen.getAllByRole("button").forEach((button) => {
            expect(button).toHaveAttribute("tabindex", "-1");
        });
    });

    it("keeps the items focusable with an open sidebar on desktop", () => {
        useStore.setState({ sidebarOpen: true });
        render(<Portfolio />);

        screen.getAllByRole("button").forEach((button) => {
            expect(button).toHaveAttribute("tabindex", "0");
        });
    });

    it("renders the popup", () => {
        render(<Portfolio />);

        expect(screen.getByTestId("popup")).toBeInTheDocument();
    });
});
