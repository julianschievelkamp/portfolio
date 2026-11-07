import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import List from "./List";

describe("List", () => {
    it("renders one list item per entry", () => {
        render(<List items={["One", "Two", "Three"]} />);

        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
        expect(screen.getByText("Two")).toBeInTheDocument();
    });

    it("renders no items for an empty list", () => {
        render(<List items={[]} />);

        expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("renders React nodes as items", () => {
        render(<List items={[<strong key="a">Bold entry</strong>]} />);

        expect(screen.getByText("Bold entry").tagName).toBe("STRONG");
    });

    it("applies the margin", () => {
        render(<List items={["One"]} margin="2rem" />);

        expect(screen.getByRole("list")).toHaveStyle("margin: 32px"); // jsdom rechnet rem in px um
    });
});
