import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { languageData } from "data/languageData";

import Badges from "./Badges";

vi.mock("data/languageData", async () => {
    return {
        languageData: {
            about: {
                badges: {
                    headline: "FIRST PRIZE",
                    items: {
                        fapa: {
                            image: "fapa.png",
                            alt: "Fine Art Photography Awards",
                            link: "https://example.com/fapa",
                        },
                        px3: {
                            image: "px3.png",
                            alt: "Prix de la Photographie Paris",
                            link: "https://example.com/px3",
                        },
                        nd: {
                            image: "nd.png",
                            alt: "ND Awards",
                            link: "https://example.com/nd",
                        },
                    },
                },
            },
        },
    };
});

describe("Badges", () => {
    it("shows the headline", () => {
        render(<Badges />);

        expect(
            screen.getByRole("heading", { level: 2, name: "FIRST PRIZE" }),
        ).toBeInTheDocument();
    });

    it("links every badge image with its alt text in a new tab", () => {
        render(<Badges />);

        Object.values(languageData.about.badges.items).forEach((badge) => {
            const link = screen.getByRole("link", { name: badge.alt });

            expect(link).toHaveAttribute("href", badge.link);
            expect(link).toHaveAttribute("target", "_blank");
            expect(
                screen.getByRole("img", { name: badge.alt }),
            ).toHaveAttribute("src", badge.image);
        });
    });
});
