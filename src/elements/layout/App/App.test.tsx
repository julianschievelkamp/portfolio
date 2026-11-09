import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import { TRANSITION_DEFAULT } from "styles/variables";
import App from "./App";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock("elements/layout/Sidebar/Sidebar", () => ({ default: () => <aside /> }));
vi.mock("elements/layout/Menu/Menu", () => ({ default: () => <header /> }));
// jsdom erhält keine Styles von styled-components, daher wird die Prop direkt geprüft
vi.mock("styles/global", () => ({
    default: ({ $scrollLocked }: { $scrollLocked?: boolean }) => (
        <span data-testid="global-style" data-scroll-locked={$scrollLocked} />
    ),
}));

const page = {
    name: "Test",
    title: "Test heading",
    description: "Test description",
    path: "/test",
    element: null,
};

describe("App", () => {
    beforeEach(() => {
        useStore.setState({ sidebarOpen: false, popupOpen: false });
        vi.mocked(useMediaQuery).mockReturnValue(false);
    });

    it("renders exactly one h1 with the page heading inside main", () => {
        render(<App page={page}>
                <p>Content</p>
            </App>);

        const headings = screen.getAllByRole("heading", { level: 1 });

        expect(headings).toHaveLength(1);
        expect(headings[0]).toHaveTextContent("Test heading");
        expect(screen.getByRole("main")).toContainElement(headings[0]);
    });

    it("renders the page content", () => {
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("always renders menu and sidebar regardless of the viewport", () => {
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("complementary")).toBeInTheDocument();
    });

    it("keeps the page interactive while the sidebar is closed", () => {
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByRole("main")).not.toHaveAttribute("inert");
    });

    it("makes the page inert while the sidebar is open on mobile", () => {
        useStore.setState({ sidebarOpen: true });
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByRole("main", { hidden: true })).toHaveAttribute(
            "inert",
        );
    });

    it("keeps the page interactive with an open sidebar on desktop", () => {
        useStore.setState({ sidebarOpen: true });
        vi.mocked(useMediaQuery).mockReturnValue(true);
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByRole("main")).not.toHaveAttribute("inert");
    });

    it("keeps the page scrollable while no overlay is open", () => {
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByTestId("global-style")).toHaveAttribute(
            "data-scroll-locked",
            "false",
        );
    });

    it("locks page scrolling while the sidebar is open on mobile", () => {
        useStore.setState({ sidebarOpen: true });
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByTestId("global-style")).toHaveAttribute(
            "data-scroll-locked",
            "true",
        );
    });

    it("keeps page scrolling locked until the sidebar has closed", () => {
        vi.useFakeTimers();
        useStore.setState({ sidebarOpen: true });
        render(<App page={page}>
                <p>Content</p>
            </App>);

        act(() => useStore.setState({ sidebarOpen: false }));

        // Während der Schließen-Animation weiterhin gesperrt
        expect(screen.getByTestId("global-style")).toHaveAttribute(
            "data-scroll-locked",
            "true",
        );

        act(() => vi.advanceTimersByTime(TRANSITION_DEFAULT));

        expect(screen.getByTestId("global-style")).toHaveAttribute(
            "data-scroll-locked",
            "false",
        );
        vi.useRealTimers();
    });

    it("keeps the page scrollable with an open sidebar on desktop", () => {
        useStore.setState({ sidebarOpen: true });
        vi.mocked(useMediaQuery).mockReturnValue(true);
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByTestId("global-style")).toHaveAttribute(
            "data-scroll-locked",
            "false",
        );
    });

    it("locks page scrolling while the popup is open", () => {
        useStore.setState({ popupOpen: true });
        vi.mocked(useMediaQuery).mockReturnValue(true);
        render(<App page={page}>
                <p>Content</p>
            </App>);

        expect(screen.getByTestId("global-style")).toHaveAttribute(
            "data-scroll-locked",
            "true",
        );
    });
});
