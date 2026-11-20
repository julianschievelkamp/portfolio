import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import App from "./App";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock("elements/layout/App/Sidebar/Sidebar", () => ({
    default: () => <aside />,
}));
vi.mock("elements/layout/App/Header/Header", () => ({
    default: () => <header />,
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
        render(
            <App page={page}>
                <p>Content</p>
            </App>,
        );

        const headings = screen.getAllByRole("heading", { level: 1 });

        expect(headings).toHaveLength(1);
        expect(headings[0]).toHaveTextContent("Test heading");
        expect(screen.getByRole("main")).toContainElement(headings[0]);
        expect(screen.getByRole("main")).toContainElement(
            screen.getByText("Content"),
        );
    });

    it.each([
        {
            name: "sidebar closed on mobile",
            sidebar: false,
            popup: false,
            desktop: false,
            inert: false,
        },
        {
            name: "sidebar open on desktop",
            sidebar: true,
            popup: false,
            desktop: true,
            inert: false,
        },
        {
            name: "sidebar open on mobile",
            sidebar: true,
            popup: false,
            desktop: false,
            inert: true,
        },
        {
            name: "popup open",
            sidebar: false,
            popup: true,
            desktop: true,
            inert: true,
        },
    ])(
        "sets inert on the page to $inert with $name",
        ({ sidebar, popup, desktop, inert }) => {
            useStore.setState({ sidebarOpen: sidebar, popupOpen: popup });
            vi.mocked(useMediaQuery).mockReturnValue(desktop);
            render(
                <App page={page}>
                    <p>Content</p>
                </App>,
            );

            const main = screen.getByRole("main", { hidden: true });

            if (inert) {
                expect(main).toHaveAttribute("inert");
            } else {
                expect(main).not.toHaveAttribute("inert");
            }
        },
    );
});
