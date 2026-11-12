import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { badges, portfolioData } from "data/portfolioFixtures";
import ItemInfo from "./ItemInfo";

vi.mock("data/portfolioData", async () => await import("data/portfolioFixtures"));

const [itemWithBadges, , itemWithoutBadges] = portfolioData;

describe("ItemInfo", () => {
    it("shows title and year and the type", () => {
        render(<ItemInfo loadedItem={itemWithBadges} />);

        expect(screen.getByText("First Photo, 2020")).toBeInTheDocument();
        expect(screen.getByText("analog photograph")).toBeInTheDocument();
    });

    it("shows the badges with their alt text", () => {
        render(<ItemInfo loadedItem={itemWithBadges} />);

        // Die Info ist ausgeblendet, daher werden auch versteckte Bilder gesucht
        const images = screen.getAllByRole("img", { hidden: true });

        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute("alt", badges.fapa.alt);
        expect(images[1]).toHaveAttribute("alt", badges.nd.alt);
    });

    it("shows no badges for an item without badges", () => {
        render(<ItemInfo loadedItem={itemWithoutBadges} />);

        expect(
            screen.queryByRole("img", { hidden: true }),
        ).not.toBeInTheDocument();
    });

    it("is hidden but stays in the document", () => {
        render(<ItemInfo loadedItem={itemWithBadges} />);

        expect(screen.getByText("First Photo, 2020")).toBeInTheDocument();
        expect(screen.getByText("First Photo, 2020")).not.toBeVisible();
    });

    it("renders as a figcaption", () => {
        const { container } = render(<ItemInfo loadedItem={itemWithBadges} />);

        expect(container.firstElementChild?.tagName).toBe("FIGCAPTION");
    });
});
