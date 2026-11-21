import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";

import Header from "./Header";

vi.mock("data/languageData", () => ({
    languageData: { title: "Site Title" },
}));
// The icon is replaced so the chosen icon name can be verified
vi.mock("elements/components/Icon/Icon", () => ({
    default: ({ name }: { name: string }) => (
        <span data-name={name} data-testid="icon" />
    ),
}));

describe("Header", () => {
    beforeEach(() => {
        useStore.setState({ sidebarOpen: false });
    });

    it("renders the site title as a link to the start page inside the banner", () => {
        render(<Header />);

        const link = screen.getByRole("link", { name: "Site Title" });

        expect(link).toHaveAttribute("href", "/");
        expect(screen.getByRole("banner")).toContainElement(link);
    });

    it("closes the sidebar when the title link is clicked", async () => {
        useStore.setState({ sidebarOpen: true });
        render(<Header />);

        await userEvent.click(screen.getByRole("link", { name: "Site Title" }));

        expect(useStore.getState().sidebarOpen).toBe(false);
    });

    it("shows the hamburger icon when closed and the close icon when open", async () => {
        render(<Header />);
        expect(screen.getByTestId("icon")).toHaveAttribute(
            "data-name",
            "hamburger",
        );

        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("icon")).toHaveAttribute(
            "data-name",
            "close",
        );
    });

    it("toggles the sidebar and exposes its state via label, aria-expanded and aria-controls", async () => {
        render(<Header />);
        const button = screen.getByRole("button", { name: "Open sidebar" });

        expect(button).toHaveAttribute("aria-controls", "sidebar");
        expect(button).toHaveAttribute("aria-expanded", "false");

        await userEvent.click(button);

        expect(useStore.getState().sidebarOpen).toBe(true);
        expect(button).toHaveAccessibleName("Close sidebar");
        expect(button).toHaveAttribute("aria-expanded", "true");

        await userEvent.click(button);

        expect(useStore.getState().sidebarOpen).toBe(false);
        expect(button).toHaveAccessibleName("Open sidebar");
        expect(button).toHaveAttribute("aria-expanded", "false");
    });
});
