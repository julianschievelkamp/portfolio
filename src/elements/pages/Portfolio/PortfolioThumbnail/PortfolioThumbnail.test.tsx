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

const renderThumbnail = (tabIndex = 0) => {
    const onSelect = vi.fn();

    render(
        <PortfolioThumbnail
            item={item}
            index={2}
            tabIndex={tabIndex}
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

    it("passes the tab index on to the button", () => {
        renderThumbnail(-1);

        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
    });
});
