import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";
import { useStore } from "hooks/useStore";

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
});
