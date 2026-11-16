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

    it("hides visually but stays in the accessibility tree when visuallyHidden is set", () => {
        const { container, rerender } = render(<Headline>Title</Headline>);

        expect(container.firstElementChild).not.toHaveStyle({
            position: "absolute",
        });

        rerender(<Headline visuallyHidden>Title</Headline>);

        expect(container.firstElementChild).toHaveStyle({ position: "absolute" });
        expect(
            screen.getByRole("heading", { level: 1, name: "Title" }),
        ).toBeInTheDocument();
    });
});
