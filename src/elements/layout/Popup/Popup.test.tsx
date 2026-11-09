import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { usePopupControls } from "hooks/usePopupControls";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Popup from "./Popup";

vi.mock("hooks/usePopupControls", () => ({ usePopupControls: vi.fn() }));
vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);
vi.mock("./Slider/Slider", () => ({
    default: () => <div data-testid="slider" />,
}));
vi.mock("./ActiveItem/ActiveItem", () => ({
    default: () => <div data-testid="active-item" />,
}));
vi.mock("./Arrows/Arrows", () => ({
    default: () => <div data-testid="arrows" />,
}));

// Steuert die Media Queries über ihren Query-String
const mockMediaQueries = (matches: Record<string, boolean>) => {
    vi.mocked(useMediaQuery).mockImplementation(
        (query: string) => matches[query] ?? false,
    );
};

describe("Popup", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    beforeEach(() => {
        vi.useFakeTimers();
        useStore.setState({ popupOpen: true });
        mockMediaQueries({});
    });

    it("renders a named modal dialog while open", () => {
        render(<Popup />);

        expect(
            screen.getByRole("dialog", { name: "Artwork Dialog" }),
        ).toBeInTheDocument();
    });

    it("opens and closes the native dialog with the store state", () => {
        useStore.setState({ popupOpen: false });
        render(<Popup />);
        const dialog = document.querySelector("dialog") as HTMLDialogElement;

        expect(dialog.open).toBe(false);

        act(() => useStore.setState({ popupOpen: true }));
        expect(dialog.open).toBe(true);

        act(() => useStore.setState({ popupOpen: false }));
        // Schließt erst nach der Ausblend-Transition
        expect(dialog.open).toBe(true);

        act(() => {
            vi.advanceTimersByTime(300);
        });
        expect(dialog.open).toBe(false);
    });

    it("closes through the store on ESC instead of closing immediately", () => {
        render(<Popup />);
        const dialog = document.querySelector("dialog") as HTMLDialogElement;

        const event = new Event("cancel", { cancelable: true });
        act(() => {
            dialog.dispatchEvent(event);
        });

        expect(event.defaultPrevented).toBe(true);
        expect(useStore.getState().popupOpen).toBe(false);
        expect(dialog.open).toBe(true);
    });

    it("updates the store when the dialog closes itself, e.g. via ESC", () => {
        render(<Popup />);
        const dialog = document.querySelector("dialog") as HTMLDialogElement;

        act(() => dialog.close());

        expect(useStore.getState().popupOpen).toBe(false);
    });

    it("closes via the close button, which is reachable by keyboard", () => {
        render(<Popup />);
        const close = screen.getByRole("button", { name: "Close Dialog" });

        expect(close).toHaveAttribute("tabindex", "0");

        fireEvent.click(close);

        expect(useStore.getState().popupOpen).toBe(false);
    });

    it("closes when the backdrop is clicked", () => {
        render(<Popup />);
        const backdrop =
            screen.getByTestId("active-item").parentElement
                ?.previousElementSibling;

        fireEvent.click(backdrop as Element);

        expect(useStore.getState().popupOpen).toBe(false);
    });

    it("registers the popup hook", () => {
        render(<Popup />);

        expect(usePopupControls).toHaveBeenCalled();
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
