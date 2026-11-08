import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Headline from "./Headline";

describe("Headline", () => {
    it("renders an h1 by default", () => {
        render(<Headline>Title</Headline>);

        expect(
            screen.getByRole("heading", { level: 1, name: "Title" }),
        ).toBeInTheDocument();
    });

    it("renders an h2 when type is h2", () => {
        render(<Headline type="h2">Title</Headline>);

        expect(
            screen.getByRole("heading", { level: 2, name: "Title" }),
        ).toBeInTheDocument();
    });

    it("applies the default headline styles", () => {
        render(<Headline>Title</Headline>);

        expect(screen.getByRole("heading")).toHaveStyle({
            textAlign: "center",
            fontWeight: "900",
            lineHeight: "1.5",
        });
    });

    it("applies a smaller font size to h2", () => {
        render(<Headline type="h2">Title</Headline>);

        // jsdom rechnet rem in px um (1rem = 16px)
        expect(screen.getByRole("heading")).toHaveStyle({ fontSize: "20px" });
    });

    it("stays in the accessibility tree when visually hidden", () => {
        render(<Headline visuallyHidden>Title</Headline>);

        expect(
            screen.getByRole("heading", { level: 1, name: "Title" }),
        ).toBeInTheDocument();
    });

    it("applies the visually hidden styles to the wrapper only if requested", () => {
        const { container, rerender } = render(<Headline>Title</Headline>);
        const wrapper = container.firstElementChild;

        expect(wrapper).not.toHaveStyle({ position: "absolute" });

        rerender(<Headline visuallyHidden>Title</Headline>);

        expect(container.firstElementChild).toHaveStyle({ position: "absolute" });
    });
});
