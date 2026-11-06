import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { usePopup } from "hooks/usePopup";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Popup from ".";

vi.mock("hooks/usePopup", () => ({ usePopup: vi.fn() }));
vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock("data/portfolioData", async () => await import("data/portfolioFixtures"));
vi.mock("./parts/slider", () => ({
    default: () => <div data-testid="slider" />,
}));
vi.mock("./parts/active-item", () => ({
    default: () => <div data-testid="active-item" />,
}));
vi.mock("./parts/arrows", () => ({
    default: () => <div data-testid="arrows" />,
}));

// Steuert die Media Queries über ihren Query-String
const mockMediaQueries = (matches: Record<string, boolean>) => {
    vi.mocked(useMediaQuery).mockImplementation(
        (query: string) => matches[query] ?? false,
    );
};

describe("Popup", () => {
    beforeEach(() => {
        useStore.setState({ popupOpen: true });
        mockMediaQueries({});
    });

    it("closes via the close button, which is skipped by tab navigation", async () => {
        render(<Popup />);
        const close = screen.getByRole("button", { name: "Close" });

        expect(close).toHaveAttribute("tabindex", "-1");

        await userEvent.click(close);

        expect(useStore.getState().popupOpen).toBe(false);
    });

    it("closes when the backdrop is clicked", async () => {
        render(<Popup />);
        const backdrop =
            screen.getByTestId("active-item").parentElement
                ?.previousElementSibling;

        await userEvent.click(backdrop as Element);

        expect(useStore.getState().popupOpen).toBe(false);
    });

    it("registers the popup hook", () => {
        render(<Popup />);

        expect(usePopup).toHaveBeenCalled();
    });

    it("always renders the active item and the slider", () => {
        render(<Popup />);

        expect(screen.getByTestId("active-item")).toBeInTheDocument();
        expect(screen.getByTestId("slider")).toBeInTheDocument();
    });

    it("shows the arrows only in landscape outside the small landscape range", () => {
        mockMediaQueries({ [queries.landscape]: true });
        const { rerender } = render(<Popup />);
        expect(screen.getByTestId("arrows")).toBeInTheDocument();

        mockMediaQueries({
            [queries.landscape]: true,
            [queries.landscapeLgMax]: true,
        });
        rerender(<Popup />);
        expect(screen.queryByTestId("arrows")).not.toBeInTheDocument();

        mockMediaQueries({});
        rerender(<Popup />);
        expect(screen.queryByTestId("arrows")).not.toBeInTheDocument();
    });
});
