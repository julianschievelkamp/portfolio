import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import Sidebar from "./Sidebar";

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
    pages: { home: { name: "Home", heading: "Home", path: "/", element: null } },
    links: { social: { name: "Social", path: "https://example.com" } },
}));

const page = { name: "Home", heading: "Home", path: "/", element: null };

// CloseTrigger ist ein reines div ohne Rolle und wird über seinen Style gefunden
const findCloseTrigger = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement;

describe("Sidebar", () => {
    beforeEach(() => {
        // Geöffnet, da eine geschlossene Sidebar per visibility versteckt ist
        useStore.setState({ sidebarOpen: true });
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

    it("renders the title as plain text and not as a heading", () => {
        render(<Sidebar page={page} />);

        expect(screen.getByText("Site Title")).toBeInTheDocument();
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("always renders the close trigger and the sidebar", () => {
        // Die Umschaltung zwischen Mobile und Desktop erfolgt per CSS
        const { container } = render(<Sidebar page={page} />);

        expect(container.children).toHaveLength(2);
    });

    it("closes the sidebar when the close trigger is clicked", async () => {
        const { container } = render(<Sidebar page={page} />);

        await userEvent.click(findCloseTrigger(container));

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("activates the close trigger only while the sidebar is open", () => {
        const { container } = render(<Sidebar page={page} />);
        expect(findCloseTrigger(container)).toHaveStyle("pointer-events: all");

        act(() => useStore.setState({ sidebarOpen: false }));

        expect(findCloseTrigger(container)).toHaveStyle("pointer-events: none");
    });

    it("uses semantic landmarks for aside, navigation and footer", () => {
        render(<Sidebar page={page} />);

        expect(
            screen.getByRole("complementary", { name: "Site navigation" }),
        ).toHaveAttribute("id", "sidebar");
        expect(screen.getByRole("contentinfo")).toHaveTextContent("Copyright text");
        expect(
            screen.getByRole("navigation", { name: "Main navigation" }),
        ).toBeInTheDocument();
    });

    it("closes the sidebar with Escape and returns focus to the toggle", async () => {
        render(
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
        useStore.setState({ sidebarOpen: false });
        render(
            <>
                <button id="sidebar-toggle">Toggle</button>
                <Sidebar page={page} />
            </>,
        );

        await userEvent.keyboard("{Escape}");

        expect(screen.getByRole("button", { name: "Toggle" })).not.toHaveFocus();
    });
});
