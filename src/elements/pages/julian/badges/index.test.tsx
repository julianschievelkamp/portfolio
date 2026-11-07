import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { badges } from "data/portfolioFixtures";
import Badges from ".";

vi.mock("data/portfolioData", async () => await import("data/portfolioFixtures"));
vi.mock("data/languageData", () => ({
    languageData: { badges: { headline: "FIRST PRIZE" } },
}));

describe("Badges", () => {
    it("shows the headline", () => {
        render(<Badges />);

        expect(
            screen.getByRole("heading", { level: 2, name: "FIRST PRIZE" }),
        ).toBeInTheDocument();
    });

    it("links every badge in a new tab", () => {
        render(<Badges />);

        Object.values(badges).forEach((badge) => {
            const link = screen.getByRole("link", { name: badge.alt });

            expect(link).toHaveAttribute("href", badge.link);
            expect(link).toHaveAttribute("target", "_blank");
        });
    });

    it("shows every badge image with its alt text", () => {
        render(<Badges />);

        Object.values(badges).forEach((badge) => {
            expect(screen.getByRole("img", { name: badge.alt })).toHaveAttribute(
                "src",
                badge.image,
            );
        });
    });
});
