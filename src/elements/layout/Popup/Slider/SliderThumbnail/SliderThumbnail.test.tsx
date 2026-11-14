import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { portfolioData, getAltText } from "data/portfolioFixtures";
import SliderThumbnail from "./SliderThumbnail";

vi.mock(
    "data/portfolioData",
    async () => await import("data/portfolioFixtures"),
);

const item = portfolioData[0];

const renderThumbnail = (isActive = false) => {
    const onSelect = vi.fn();
    const onItemFocus = vi.fn();

    render(
        <ul>
            <SliderThumbnail
                item={item}
                index={3}
                isActive={isActive}
                onSelect={onSelect}
                onItemFocus={onItemFocus}
            />
        </ul>,
    );

    return { onSelect, onItemFocus };
};

// Die Abdunklung wird über die Opacity des Bildes im Button gesteuert. Da jsdom
// verschachtelte Selektoren nicht auswertet, werden die CSS-Regeln gelesen
const getImageOpacity = () => {
    const button = screen.getByRole("button");
    const rules = Array.from(document.styleSheets).flatMap((sheet) =>
        Array.from(sheet.cssRules),
    );
    const imageRule = rules.find(
        (rule): rule is CSSStyleRule =>
            rule instanceof CSSStyleRule &&
            Array.from(button.classList).some(
                (className) => rule.selectorText === `.${className} img`,
            ) &&
            rule.style.opacity !== "",
    );

    return imageRule?.style.opacity;
};

describe("SliderThumbnail", () => {
    it("renders a labelled button with a lazy loaded image", () => {
        renderThumbnail();

        const button = screen.getByRole("button", {
            name: `Show ${item.title}`,
        });
        const image = screen.getByRole("img", { name: getAltText(item) });

        expect(button).toContainElement(image);
        expect(image).toHaveAttribute("loading", "lazy");
    });

    it("reports its index on click", async () => {
        const { onSelect } = renderThumbnail();

        await userEvent.click(screen.getByRole("button"));

        expect(onSelect).toHaveBeenCalledWith(3);
    });

    it("reports its index on focus", () => {
        const { onItemFocus } = renderThumbnail();

        fireEvent.focus(screen.getByRole("button"));

        expect(onItemFocus).toHaveBeenCalledWith(expect.anything(), 3);
    });

    it("marks the active item with aria-current", () => {
        renderThumbnail(true);

        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-current",
            "true",
        );
    });

    it("shows the active item without dimming", () => {
        renderThumbnail(true);

        expect(getImageOpacity()).toBe("1");
    });

    it("dims an inactive item by reducing the image opacity", () => {
        renderThumbnail();

        expect(getImageOpacity()).toBe("0.5");
    });
});
