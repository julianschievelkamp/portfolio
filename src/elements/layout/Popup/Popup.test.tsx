import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";

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
            screen.getByRole("dialog", { name: "Popup" }),
        ).toBeInTheDocument();
    });

    it("renders the slider only after the popup was opened once", () => {
        useStore.setState({ popupOpen: false });
        render(<Popup />);

        expect(screen.queryByTestId("slider")).not.toBeInTheDocument();

        act(() => useStore.setState({ popupOpen: true }));
        expect(screen.getByTestId("slider")).toBeInTheDocument();

        act(() => useStore.setState({ popupOpen: false }));
        expect(screen.getByTestId("slider")).toBeInTheDocument();
    });

    it("opens and closes the native dialog with the store state", () => {
        useStore.setState({ popupOpen: false });
        render(<Popup />);
        const dialog = document.querySelector("dialog") as HTMLDialogElement;

        expect(dialog.open).toBe(false);

        act(() => useStore.setState({ popupOpen: true }));
        expect(dialog.open).toBe(true);

        act(() => useStore.setState({ popupOpen: false }));
        // Only closes after the fade-out transition
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

    // The backdrop has neither role nor label, it is the first child of the dialog
    const getBackdrop = () =>
        document.querySelector("dialog")?.firstElementChild as HTMLElement;

    it("closes the popup via the backdrop", () => {
        render(<Popup />);

        act(() => getBackdrop().click());

        expect(useStore.getState().popupOpen).toBe(false);
    });
});
