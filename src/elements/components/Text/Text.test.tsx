import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Text from "./Text";

describe("Text", () => {
    it("renders its children as a paragraph", () => {
        render(<Text>Hello</Text>);

        expect(screen.getByText("Hello").tagName).toBe("P");
    });
});
