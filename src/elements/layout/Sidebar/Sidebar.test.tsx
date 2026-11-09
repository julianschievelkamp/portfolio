import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import Sidebar from "./Sidebar";

// jsdom kennt kein window.matchMedia, daher wird die Media Query gemockt
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
    pages: {
        home: { name: "Home", title: "Home", description: "Home", path: "/", element: null },
    },
    links: { social: { name: "Social", path: "https://example.com" } },
}));

const page = { name: "Home", title: "Home", description: "Home", path: "/", element: null };

// CloseTrigger ist ein reines div ohne Rolle und wird über seinen Style gefunden
const findCloseTrigger = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement;

const openSidebar = () => act(() => useStore.setState({ sidebarOpen: true }));

// Rendert und öffnet die Sidebar erst danach, da sie beim ersten Rendern
// geschlossen wird und eine geschlossene Sidebar per visibility versteckt ist
const renderOpenSidebar = (ui: ReactElement = <Sidebar page={page} />) => {
    const result = render(ui);
    openSidebar();

    return result;
};

describe("Sidebar", () => {
    beforeEach(() => {
        useStore.setState({ sidebarOpen: false });
        vi.mocked(useMediaQuery).mockReturnValue(false);
    });

    it("closes the sidebar on the first render", () => {
        useStore.setState({ sidebarOpen: true });

        render(<Sidebar page={page} />);

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("closes the sidebar when switching to the desktop layout", () => {
        const { rerender } = renderOpenSidebar();

        vi.mocked(useMediaQuery).mockReturnValue(true);
        rerender(<Sidebar page={page} />);

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("closes the sidebar when switching to the mobile layout", () => {
        vi.mocked(useMediaQuery).mockReturnValue(true);
        const { rerender } = renderOpenSidebar();

        vi.mocked(useMediaQuery).mockReturnValue(false);
        rerender(<Sidebar page={page} />);

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("keeps the sidebar open while the layout does not change", () => {
        const { rerender } = renderOpenSidebar();

        rerender(<Sidebar page={page} />);

        expect(useStore.getState().sidebarOpen).toBe(true);
    });

    it("shows intro, copyright and the navigation", () => {
        renderOpenSidebar();

        expect(screen.getByText("Intro text")).toBeInTheDocument();
        expect(screen.getByText("Copyright text")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
            "aria-current",
            "page",
        );
    });

    it("renders the title as plain text and not as a heading", () => {
        renderOpenSidebar();

        expect(screen.getByText("Site Title")).toBeInTheDocument();
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("always renders the close trigger and the sidebar", () => {
        // Die Umschaltung zwischen Mobile und Desktop erfolgt per CSS
        const { container } = renderOpenSidebar();

        expect(container.children).toHaveLength(2);
    });

    it("closes the sidebar when the close trigger is clicked", async () => {
        const { container } = renderOpenSidebar();

        await userEvent.click(findCloseTrigger(container));

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("activates the close trigger only while the sidebar is open", () => {
        const { container } = renderOpenSidebar();
        expect(findCloseTrigger(container)).toHaveStyle("visibility: visible");

        act(() => useStore.setState({ sidebarOpen: false }));

        expect(findCloseTrigger(container)).toHaveStyle("visibility: hidden");
    });

    it("uses semantic landmarks for aside, navigation and footer", () => {
        renderOpenSidebar();

        expect(
            screen.getByRole("complementary", { name: "Sidebar" }),
        ).toHaveAttribute("id", "sidebar");
        expect(screen.getByRole("contentinfo")).toHaveTextContent(
            "Copyright text",
        );
        expect(
            screen.getByRole("navigation", { name: "Navigation" }),
        ).toBeInTheDocument();
    });

    it("closes the sidebar with Escape and returns focus to the toggle", async () => {
        renderOpenSidebar(
            <>
                <button id="sidebar-toggle">Toggle</button>
                <Sidebar page={page} />
            </>,
        );

        await userEvent.keyboard("{Escape}");

        expect(useStore.getState().sidebarOpen).toBe(false);
        expect(screen.getByRole("button", { name: "Toggle" })).toHaveFocus();
    });

    it("ignores Escape while the sidebar is closed", async () => {
        render(
            <>
                <button id="sidebar-toggle">Toggle</button>
                <Sidebar page={page} />
            </>,
        );

        await userEvent.keyboard("{Escape}");

        expect(
            screen.getByRole("button", { name: "Toggle" }),
        ).not.toHaveFocus();
    });
});
