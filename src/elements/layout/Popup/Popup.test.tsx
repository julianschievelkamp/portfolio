import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { usePopupControls } from "hooks/usePopupControls";
import Popup from "./Popup";

vi.mock("hooks/usePopupControls", () => ({ usePopupControls: vi.fn() }));
vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => false }));
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

describe("Popup", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    beforeEach(() => {
        vi.useFakeTimers();
        useStore.setState({ popupOpen: true });
    });

    it("renders a named modal dialog while open", () => {
        render(<Popup />);

        expect(
            screen.getByRole("dialog", { name: "Artwork Popup" }),
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

    it("registers the popup hook", () => {
        render(<Popup />);

        expect(usePopupControls).toHaveBeenCalled();
    });

    it("always renders the active item and the slider", () => {
        render(<Popup />);

        expect(screen.getByTestId("active-item")).toBeInTheDocument();
        expect(screen.getByTestId("slider")).toBeInTheDocument();
    });

    // Der Backdrop hat weder Rolle noch Label, er ist das erste Kind des Dialogs
    const getBackdrop = () =>
        document.querySelector("dialog")?.firstElementChild as HTMLElement;

    it("closes the popup via the backdrop", () => {
        render(<Popup />);

        act(() => getBackdrop().click());

        expect(useStore.getState().popupOpen).toBe(false);
    });

    it("uses a custom close cursor with a pointer fallback on the backdrop", () => {
        render(<Popup />);

        const { cursor } = getComputedStyle(getBackdrop());
        expect(cursor).toContain("data:image/svg+xml");
        expect(cursor).toContain("pointer");
    });
});
