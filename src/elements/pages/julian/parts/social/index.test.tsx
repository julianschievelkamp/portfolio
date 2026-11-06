import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Social from ".";

vi.mock("data/languageData", () => ({
    languageData: {
        social: {
            image: "profile.jpg",
            link: "https://example.com/profile",
            name: "Full Name",
            profile: "@handle",
        },
    },
}));

describe("Social", () => {
    it("shows profile handle and name", () => {
        render(<Social />);

        expect(screen.getByText("@handle")).toBeInTheDocument();
        expect(screen.getByText("Full Name")).toBeInTheDocument();
    });

    it("links the handle to the profile in a new tab", () => {
        render(<Social />);

        const link = screen.getByRole("link", { name: "@handle" });

        expect(link).toHaveAttribute("href", "https://example.com/profile");
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("shows the profile image with alt text", () => {
        render(<Social />);

        expect(
            screen.getByRole("img", { name: "Instagram Profile" }),
        ).toHaveAttribute("src", "profile.jpg");
    });

    it("opens the profile when the whole area is clicked", async () => {
        const open = vi.spyOn(window, "open").mockImplementation(() => null);
        render(<Social />);

        await userEvent.click(screen.getByText("Full Name"));

        expect(open).toHaveBeenCalledWith("https://example.com/profile");
    });
});
