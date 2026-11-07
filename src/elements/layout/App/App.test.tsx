import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("elements/layout/Sidebar/Sidebar", () => ({ default: () => <aside /> }));
vi.mock("elements/layout/Menu/Menu", () => ({ default: () => <header /> }));

const page = {
    name: "Test",
    heading: "Test heading",
    path: "/test",
    element: <p>Content</p>,
};

describe("App", () => {
    it("renders exactly one h1 with the page heading inside main", () => {
        render(<App page={page} />);

        const headings = screen.getAllByRole("heading", { level: 1 });

        expect(headings).toHaveLength(1);
        expect(headings[0]).toHaveTextContent("Test heading");
        expect(screen.getByRole("main")).toContainElement(headings[0]);
    });

    it("renders the page content", () => {
        render(<App page={page} />);

        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("always renders menu and sidebar regardless of the viewport", () => {
        render(<App page={page} />);

        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("complementary")).toBeInTheDocument();
    });
});
