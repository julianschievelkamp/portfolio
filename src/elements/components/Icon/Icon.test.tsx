import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Icon from "./Icon";
import { icons } from "./icons";

describe("Icon", () => {
    it.each(Object.keys(icons) as (keyof typeof icons)[])(
        "renders the %s icon as svg",
        (name) => {
            const { container } = render(<Icon name={name} />);

            expect(container.querySelector("svg")).toBeInTheDocument();
        },
    );

    it("renders as span and hides the svg from assistive technology", () => {
        const { container } = render(<Icon name="close" />);

        expect(container.firstChild?.nodeName).toBe("SPAN");
        expect(container.querySelector("svg")).toHaveAttribute(
            "aria-hidden",
            "true",
        );
    });

    // jsdom converts rem to px (1rem = 16px)
    it("uses 1rem as default size and applies custom size and padding", () => {
        const { container, rerender } = render(<Icon name="close" />);

        expect(container.firstChild).toHaveStyle({
            width: "16px",
            height: "16px",
        });

        rerender(<Icon name="close" padding="0.5rem" size="2rem" />);

        expect(container.firstChild).toHaveStyle({
            width: "32px",
            height: "32px",
            padding: "8px",
        });
    });
});
