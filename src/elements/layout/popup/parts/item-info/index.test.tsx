import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { badges, portfolioData } from "data/portfolioFixtures";
import ItemInfo from ".";

vi.mock("data/portfolioData", async () => await import("data/portfolioFixtures"));

const [itemWithBadges, , itemWithoutBadges] = portfolioData;

describe("ItemInfo", () => {
    it("shows title and year as a level 2 heading and the type", () => {
        render(<ItemInfo loadedItem={itemWithBadges} isInfoOn />);

        expect(
            screen.getByRole("heading", { level: 2, name: "First Photo / 2020" }),
        ).toBeInTheDocument();
        expect(screen.getByText("analog photograph")).toBeInTheDocument();
    });

    it("shows the badges with their alt text", () => {
        render(<ItemInfo loadedItem={itemWithBadges} isInfoOn />);

        const images = screen.getAllByRole("img");

        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute("alt", badges.fapa.alt);
        expect(images[1]).toHaveAttribute("alt", badges.nd.alt);
    });

    it("shows no badges for an item without badges", () => {
        render(<ItemInfo loadedItem={itemWithoutBadges} isInfoOn />);

        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("follows isInfoOn for its visibility", () => {
        const { rerender } = render(
            <ItemInfo loadedItem={itemWithBadges} isInfoOn />,
        );
        expect(screen.getByRole("heading")).toBeVisible();

        rerender(<ItemInfo loadedItem={itemWithBadges} isInfoOn={false} />);

        expect(screen.getByRole("heading", { hidden: true })).not.toBeVisible();
    });
});
