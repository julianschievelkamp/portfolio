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

    // jsdom rechnet rem in px um (1rem = 16px)
    it("applies size and padding to the wrapper", () => {
        const { container } = render(
            <Icon name="close" size="2rem" padding="0.5rem" />,
        );

        expect(container.firstChild).toHaveStyle({
            width: "32px",
            height: "32px",
            padding: "8px",
        });
    });

    it("uses 1rem as default size", () => {
        const { container } = render(<Icon name="close" />);

        expect(container.firstChild).toHaveStyle({
            width: "16px",
            height: "16px",
        });
    });

    it("passes className through", () => {
        const { container } = render(<Icon name="close" className="custom" />);

        expect(container.firstChild).toHaveClass("custom");
    });
});
