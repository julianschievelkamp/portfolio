import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import Sidebar from ".";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock("data/languageData", () => ({
    languageData: {
        title: "Site Title",
        intro: "Intro text",
        copyright: "Copyright text",
        work: "WORK",
        links: "LINKS",
    },
}));
vi.mock("data/navigationData", () => ({
    pages: { home: { name: "Home", path: "/", element: null } },
    links: { social: { name: "Social", path: "https://example.com" } },
}));

const page = { name: "Home", path: "/", element: null };

// CloseTrigger ist ein reines div ohne Rolle und wird über seinen Style gefunden
const findCloseTrigger = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement;

describe("Sidebar", () => {
    beforeEach(() => {
        // Geöffnet, da eine geschlossene Sidebar per visibility versteckt ist
        useStore.setState({ sidebarOpen: true });
        vi.mocked(useMediaQuery).mockReturnValue(true);
    });

    it("shows intro, copyright and the navigation", () => {
        render(<Sidebar page={page} />);

        expect(screen.getByText("Intro text")).toBeInTheDocument();
        expect(screen.getByText("Copyright text")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
            "aria-current",
            "page",
        );
    });

    it("shows the title and no close trigger on desktop", () => {
        const { container } = render(<Sidebar page={page} />);

        expect(
            screen.getByRole("heading", { name: "Site Title" }),
        ).toBeInTheDocument();
        // Nur die Sidebar selbst, kein zusätzlicher CloseTrigger
        expect(container.children).toHaveLength(1);
    });

    it("shows no title but a close trigger on mobile", () => {
        vi.mocked(useMediaQuery).mockReturnValue(false);
        const { container } = render(<Sidebar page={page} />);

        expect(
            screen.queryByRole("heading", { name: "Site Title" }),
        ).not.toBeInTheDocument();
        expect(container.children).toHaveLength(2);
    });

    it("closes the sidebar when the close trigger is clicked", async () => {
        vi.mocked(useMediaQuery).mockReturnValue(false);
        const { container } = render(<Sidebar page={page} />);

        await userEvent.click(findCloseTrigger(container));

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("activates the close trigger only while the sidebar is open", () => {
        vi.mocked(useMediaQuery).mockReturnValue(false);
        const { container } = render(<Sidebar page={page} />);
        expect(findCloseTrigger(container)).toHaveStyle("pointer-events: all");

        act(() => useStore.setState({ sidebarOpen: false }));

        expect(findCloseTrigger(container)).toHaveStyle("pointer-events: none");
    });
});
