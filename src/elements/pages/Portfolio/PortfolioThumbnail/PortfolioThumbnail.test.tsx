import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";

import PortfolioThumbnail from "./PortfolioThumbnail";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

const item = portfolioData[0];

const renderThumbnail = (index = 2) => {
    const onSelect = vi.fn();

    render(
        <PortfolioThumbnail index={index} item={item} onSelect={onSelect} />,
    );

    return { onSelect };
};

describe("PortfolioThumbnail", () => {
    it("keeps the image and the caption outside of the button", () => {
        renderThumbnail();

        const button = screen.getByRole("button", {
            name: `Show ${item.title}`,
        });
        const image = screen.getByRole("img", { name: item.alt });
        const caption = screen.getByText(
            `${item.title}, ${item.year} – ${item.type}`,
        );

        expect(button).not.toContainElement(image);
        expect(caption.tagName).toBe("FIGCAPTION");
        expect(button.closest("figure")).toContainElement(image);
        expect(button.closest("figure")).toContainElement(caption);
    });

    it("loads only the first image with high fetch priority", () => {
        renderThumbnail(0);

        const image = screen.getByRole("img", { name: item.alt });

        expect(image).toHaveAttribute("fetchpriority", "high");
        expect(image).toHaveAttribute("loading", "eager");
    });

    it("loads images up to index 11 eagerly without high priority", () => {
        renderThumbnail(11);

        const image = screen.getByRole("img", { name: item.alt });

        expect(image).not.toHaveAttribute("fetchpriority");
        expect(image).toHaveAttribute("loading", "eager");
    });

    it("loads images from index 12 on lazily", () => {
        renderThumbnail(12);

        expect(screen.getByRole("img", { name: item.alt })).toHaveAttribute(
            "loading",
            "lazy",
        );
    });

    it("reports its index on click", async () => {
        const { onSelect } = renderThumbnail();

        await userEvent.click(screen.getByRole("button"));

        expect(onSelect).toHaveBeenCalledWith(2);
    });
});
