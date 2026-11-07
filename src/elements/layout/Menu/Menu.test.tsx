import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { useMenu } from "hooks/useMenu";
import Menu from "./Menu";

vi.mock("hooks/useMenu", () => ({ useMenu: vi.fn() }));
vi.mock("data/languageData", () => ({
    languageData: { title: "Site Title" },
}));
// Das Icon wird ersetzt, damit der gewählte Icon-Name prüfbar ist
vi.mock("elements/components/Icon/Icon", () => ({
    default: ({ name }: { name: string }) => (
        <span data-testid="icon" data-name={name} />
    ),
}));

describe("Menu", () => {
    beforeEach(() => {
        useStore.setState({ sidebarOpen: false });
        vi.mocked(useMenu).mockReturnValue({ isVisible: true });
    });

    it("renders the site title as a link to the start page", () => {
        render(<Menu />);

        expect(screen.getByRole("link", { name: "Site Title" })).toHaveAttribute(
            "href",
            "/",
        );
    });

    it("uses a header element as banner landmark", () => {
        render(<Menu />);

        expect(screen.getByRole("banner")).toContainElement(
            screen.getByRole("link", { name: "Site Title" }),
        );
    });

    it("closes the sidebar when the title link is clicked", async () => {
        useStore.setState({ sidebarOpen: true });
        render(<Menu />);

        await userEvent.click(screen.getByRole("link", { name: "Site Title" }));

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("has a keyboard reachable toggle button", async () => {
        render(<Menu />);

        await userEvent.tab();
        await userEvent.tab();

        expect(
            screen.getByRole("button", { name: "Toggle Sidebar" }),
        ).toHaveFocus();
    });

    it("opens a closed sidebar and closes an open one", async () => {
        render(<Menu />);
        const button = screen.getByRole("button", { name: "Toggle Sidebar" });

        await userEvent.click(button);
        expect(useStore.getState().sidebarOpen).toBe(true);

        await userEvent.click(button);
        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("shows the menu icon when closed and the close icon when open", async () => {
        render(<Menu />);
        expect(screen.getByTestId("icon")).toHaveAttribute("data-name", "menu");

        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("icon")).toHaveAttribute("data-name", "close");
    });

    it("follows the visibility from useMenu", () => {
        const { rerender } = render(<Menu />);
        expect(screen.getByRole("link")).toBeVisible();

        vi.mocked(useMenu).mockReturnValue({ isVisible: false });
        rerender(<Menu />);

        expect(screen.getByRole("link", { hidden: true })).not.toBeVisible();
    });

    it("exposes the sidebar state via aria-expanded and aria-controls", async () => {
        render(<Menu />);
        const button = screen.getByRole("button", { name: "Toggle Sidebar" });

        expect(button).toHaveAttribute("aria-controls", "sidebar");
        expect(button).toHaveAttribute("aria-expanded", "false");

        await userEvent.click(button);

        expect(button).toHaveAttribute("aria-expanded", "true");
    });
});
