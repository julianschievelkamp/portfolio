import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Text from ".";

describe("Text", () => {
    it("renders its children as a paragraph", () => {
        render(<Text>Hello</Text>);

        expect(screen.getByText("Hello").tagName).toBe("P");
    });

    it("applies default styles", () => {
        render(<Text>Hello</Text>);

        // jsdom rechnet rem in px um (1rem = 16px)
        expect(screen.getByText("Hello")).toHaveStyle({
            fontSize: "16px",
            lineHeight: "1.5",
            fontWeight: "400",
            color: "rgb(0, 0, 0)",
        });
    });

    it("applies style props", () => {
        render(
            <Text
                bold
                color="red"
                textAlign="center"
                margin="1rem"
                fontSize="2rem"
            >
                Hello
            </Text>,
        );

        // jsdom rechnet rem in px um (1rem = 16px)
        expect(screen.getByText("Hello")).toHaveStyle({
            fontWeight: "700",
            color: "rgb(255, 0, 0)",
            textAlign: "center",
            margin: "16px",
            fontSize: "32px",
        });
    });
});
