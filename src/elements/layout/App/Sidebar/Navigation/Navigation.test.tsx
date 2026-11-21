import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";

import Navigation from "./Navigation";

vi.mock("data/languageData", () => ({
    languageData: { sidebar: { work: "WORK", links: "LINKS" } },
}));
vi.mock("data/navigationData", () => ({
    pages: {
        home: {
            name: "Home",
            title: "Home",
            description: "Home",
            path: "/",
            element: null,
        },
        about: {
            name: "About",
            title: "About",
            description: "About",
            path: "/about",
            element: null,
        },
    },
    links: {
        social: { name: "Social", path: "https://example.com/social" },
        press: { name: "Press", path: "https://example.com/press" },
    },
}));

const home = {
    name: "Home",
    title: "Home",
    description: "Home",
    path: "/",
    element: null,
};

describe("Navigation", () => {
    beforeEach(() => {
        useStore.setState({ sidebarOpen: true });
    });

    it("renders a link for every page", () => {
        render(<Navigation page={home} />);

        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
            "href",
            "/",
        );
        expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
            "href",
            "/about",
        );
    });

    it("marks only the active page", () => {
        render(<Navigation page={home} />);

        const active = screen.getByRole("link", { name: "Home" });
        const inactive = screen.getByRole("link", { name: "About" });

        expect(active).toHaveAttribute("aria-current", "page");
        expect(inactive).not.toHaveAttribute("aria-current");
        expect(within(active).getByText("Home")).toHaveStyle(
            "font-weight: 700",
        );
        expect(within(inactive).getByText("About")).not.toHaveStyle(
            "font-weight: 700",
        );
    });

    it.each(["Home", "About"])(
        "closes the sidebar when the page %s is clicked",
        async (name) => {
            render(<Navigation page={home} />);

            await userEvent.click(screen.getByRole("link", { name }));

            expect(useStore.getState().sidebarOpen).toBe(false);
        },
    );

    it("opens external links in a new tab", () => {
        render(<Navigation page={home} />);

        const social = screen.getByRole("link", { name: "Social" });

        expect(social).toHaveAttribute("href", "https://example.com/social");
        expect(social).toHaveAttribute("target", "_blank");
        expect(screen.getByRole("link", { name: "Press" })).toHaveAttribute(
            "target",
            "_blank",
        );
    });

    it("renders pages and links as lists", () => {
        render(<Navigation page={home} />);

        const lists = screen.getAllByRole("list");

        expect(lists).toHaveLength(2);
        expect(within(lists[0]).getAllByRole("listitem")).toHaveLength(2);
        expect(within(lists[1]).getAllByRole("listitem")).toHaveLength(2);
    });

    it("labels both lists with their section titles", () => {
        render(<Navigation page={home} />);

        expect(screen.getByRole("list", { name: "WORK" })).toBeInTheDocument();
        expect(screen.getByRole("list", { name: "LINKS" })).toBeInTheDocument();
    });
});
