import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Artist from ".";

vi.mock("data/languageData", () => ({
    languageData: { julian: { image: "portrait.jpg", text: "Artist biography" } },
}));
vi.mock("../social", () => ({ default: () => <p>social</p> }));

describe("Artist", () => {
    it("shows the portrait with alt text and source", () => {
        render(<Artist />);

        expect(
            screen.getByRole("img", { name: "Julian Schievelkamp" }),
        ).toHaveAttribute("src", "portrait.jpg");
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
