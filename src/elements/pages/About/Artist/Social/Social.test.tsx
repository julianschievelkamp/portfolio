import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Social from "./Social";

vi.mock("data/languageData", () => ({
    languageData: {
        about: {
            artist: {
                social: {
                    image: {
                        alt: "Instagram Profile",
                        aspectRatio: "1/1",
                        src: "profile.jpg",
                    },
                    link: "https://example.com/profile",
                    name: "Full Name",
                    profile: "@handle",
                },
            },
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

    it("links the profile image with alt text to the profile in a new tab", () => {
        render(<Social />);

        const link = screen.getByRole("link", { name: "Instagram Profile" });

        expect(link).toHaveAttribute("href", "https://example.com/profile");
        expect(link).toHaveAttribute("target", "_blank");
        expect(
            within(link).getByRole("img", { name: "Instagram Profile" }),
        ).toHaveAttribute("src", "profile.jpg");
    });
});
