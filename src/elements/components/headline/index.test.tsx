import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Headline from ".";

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

    it("applies default styles", () => {
        render(<Headline>Title</Headline>);

        // jsdom rechnet rem in px um (1rem = 16px)
        expect(screen.getByRole("heading")).toHaveStyle({
            fontSize: "16px",
            lineHeight: "1.5",
            fontWeight: "900",
        });
    });

    it("applies style props", () => {
        render(
            <Headline
                color="red"
                textAlign="right"
                margin="2rem"
                fontSize="3rem"
                lineHeight="1"
            >
                Title
            </Headline>,
        );

        // jsdom rechnet rem in px um (1rem = 16px)
        expect(screen.getByRole("heading")).toHaveStyle({
            color: "rgb(255, 0, 0)",
            textAlign: "right",
            margin: "32px",
            fontSize: "48px",
            lineHeight: "1",
        });
    });

    it("passes className through", () => {
        render(<Headline className="custom">Title</Headline>);

        expect(screen.getByRole("heading")).toHaveClass("custom");
    });
});
