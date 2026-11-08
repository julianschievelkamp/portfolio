import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Artist from "./Artist";

vi.mock("data/languageData", () => ({
    languageData: {
        julian: {
            artist: {
                headline: "Artist headline",
                image: {
                    src: "portrait.jpg",
                    alt: "Portrait alt",
                    caption: "Portrait caption",
                },
                text: "Artist biography",
            },
        },
    },
}));
vi.mock("./Social/Social", () => ({ default: () => <p>social</p> }));

describe("Artist", () => {
    it("shows the portrait with alt text and source", () => {
        render(<Artist />);

        expect(
            screen.getByRole("img", { name: "Portrait alt" }),
        ).toHaveAttribute("src", "portrait.jpg");
    });

    it("labels the section with a heading", () => {
        render(<Artist />);

        const heading = screen.getByRole("heading", {
            level: 2,
            name: "Artist headline",
        });

        expect(heading.closest("section")).not.toBeNull();
    });

    it("captions the portrait in a figure", () => {
        render(<Artist />);

        const caption = screen.getByText("Portrait caption");

        expect(caption.tagName).toBe("FIGCAPTION");
        expect(caption.closest("figure")).toContainElement(
            screen.getByRole("img", { name: "Portrait alt" }),
        );
    });

    it("shows the biography text", () => {
        render(<Artist />);

        expect(screen.getByText("Artist biography")).toBeInTheDocument();
    });

    it("includes the social section", () => {
        render(<Artist />);

        expect(screen.getByText("social")).toBeInTheDocument();
    });
});
