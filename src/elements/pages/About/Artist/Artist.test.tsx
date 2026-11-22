import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Artist from "./Artist";

vi.mock("data/languageData", () => ({
    languageData: {
        about: {
            artist: {
                headline: "Artist headline",
                image: {
                    src: "portrait.jpg",
                    alt: "Portrait alt",
                    caption: "Portrait caption",
                },
                text: ["Artist biography", "Second paragraph"],
            },
        },
    },
}));
vi.mock("./Social/Social", () => ({ default: () => <p>social</p> }));

describe("Artist", () => {
    it("shows the portrait with alt text and source, captioned in a figure", () => {
        render(<Artist />);

        const image = screen.getByRole("img", { name: "Portrait alt" });
        const caption = screen.getByText("Portrait caption");

        expect(image).toHaveAttribute("src", "portrait.jpg");
        expect(caption.tagName).toBe("FIGCAPTION");
        expect(caption.closest("figure")).toContainElement(image);
    });

    it("labels the section with a heading", () => {
        render(<Artist />);

        const heading = screen.getByRole("heading", {
            level: 2,
            name: "Artist headline",
        });

        expect(heading.closest("section")).not.toBeNull();
    });
});
