import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { portfolioData, getAltText, getCaption } from "data/portfolioFixtures";
import Portfolio from "./Portfolio";

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
    });

    it("renders a labelled button and an image outside of it for every item", () => {
        render(<Portfolio />);

        portfolioData.forEach((item) => {
            const button = screen.getByRole("button", {
                name: `Show ${item.title}`,
            });
            const image = screen.getByRole("img", { name: getAltText(item) });

            expect(button).not.toContainElement(image);
            expect(button.closest("figure")).toContainElement(image);
        });
    });

    it("wraps every item in a figure with a caption outside the button", () => {
        render(<Portfolio />);

        portfolioData.forEach((item) => {
            const caption = screen.getByText(getCaption(item));
            const figure = caption.closest("figure");

            expect(caption.tagName).toBe("FIGCAPTION");
            expect(figure).not.toBeNull();
            expect(figure).toContainElement(
                screen.getByRole("button", { name: `Show ${item.title}` }),
            );
            expect(caption.closest("button")).toBeNull();
        });
    });

    it("selects the item and opens the popup on click", async () => {
        render(<Portfolio />);

        await userEvent.click(
            screen.getByRole("button", {
                name: `Show ${portfolioData[2].title}`,
            }),
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

    it("renders the popup", () => {
        render(<Portfolio />);

        expect(screen.getByTestId("popup")).toBeInTheDocument();
    });
});
