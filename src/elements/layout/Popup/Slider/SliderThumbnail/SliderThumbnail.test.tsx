import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";

import SliderThumbnail from "./SliderThumbnail";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

const item = portfolioData[0];

const renderThumbnail = (isActive = false) => {
    const onSelect = vi.fn();

    render(
        <ul>
            <SliderThumbnail
                index={3}
                isActive={isActive}
                item={item}
                onSelect={onSelect}
            />
        </ul>,
    );

    return { onSelect };
};

describe("SliderThumbnail", () => {
    it("renders a labelled button with a decorative image", () => {
        renderThumbnail();

        const button = screen.getByRole("button", {
            name: `Show ${item.title}`,
        });
        const image = button.querySelector("img");

        expect(image).toHaveAttribute("alt", "");
    });

    it("reports its index on click", async () => {
        const { onSelect } = renderThumbnail();

        await userEvent.click(screen.getByRole("button"));

        expect(onSelect).toHaveBeenCalledWith(3);
    });

    it("marks the active item with aria-current", () => {
        renderThumbnail(true);

        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-current",
            "true",
        );
    });

    it("is never part of the tab order", () => {
        renderThumbnail(true);
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
    });

    it("stays out of the tab order while inactive", () => {
        renderThumbnail(false);
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
    });
});
