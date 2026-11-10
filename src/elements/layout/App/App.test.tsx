import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMediaQuery } from "hooks/useMediaQuery";
import App from "./App";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: vi.fn() }));
vi.mock("elements/layout/Sidebar/Sidebar", () => ({ default: () => <aside /> }));
vi.mock("elements/layout/Header/Header", () => ({ default: () => <header /> }));

const page = {
    name: "Test",
    title: "Test heading",
    description: "Test description",
    path: "/test",
    element: null,
};

describe("App", () => {
    beforeEach(() => {
        useStore.setState({ sidebarOpen: false });
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

    it("always renders header and sidebar regardless of the viewport", () => {
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
});
