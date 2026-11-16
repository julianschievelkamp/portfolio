import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { portfolioData, getAltText, getCaption } from "data/portfolioFixtures";
import PortfolioThumbnail from "./PortfolioThumbnail";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

const item = portfolioData[0];

const renderThumbnail = (index = 2) => {
    const onSelect = vi.fn();

    render(
        <PortfolioThumbnail
            item={item}
            index={index}
            onSelect={onSelect}
        />,
    );

    return { onSelect };
};

describe("PortfolioThumbnail", () => {
    it("keeps the image and the caption outside of the button", () => {
        renderThumbnail();

        const button = screen.getByRole("button", {
            name: `Show ${item.title}`,
        });
        const image = screen.getByRole("img", { name: getAltText(item) });
        const caption = screen.getByText(getCaption(item));

        expect(button).not.toContainElement(image);
        expect(caption.tagName).toBe("FIGCAPTION");
        expect(button.closest("figure")).toContainElement(image);
        expect(button.closest("figure")).toContainElement(caption);
    });

    it("reports its index on click", async () => {
        const { onSelect } = renderThumbnail();

        await userEvent.click(screen.getByRole("button"));

        expect(onSelect).toHaveBeenCalledWith(2);
    });

    it("loads the first thumbnail eagerly with high fetch priority", () => {
        renderThumbnail(0);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("loading", "eager");
        expect(image).toHaveAttribute("fetchpriority", "high");
    });

    it("lazy loads every other thumbnail without fetch priority", () => {
        renderThumbnail(1);

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("loading", "lazy");
        expect(image).not.toHaveAttribute("fetchpriority");
    });
});
