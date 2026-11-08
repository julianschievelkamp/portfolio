import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Artist from "./Artist";

vi.mock("data/languageData", () => ({
    languageData: {
        julian: {
            artist: {
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
