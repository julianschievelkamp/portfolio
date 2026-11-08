import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Divider from "./Divider";

describe("Divider", () => {
    it("renders its content as a level 2 heading", () => {
        render(<Divider>Projects</Divider>);

        expect(
            screen.getByRole("heading", { level: 2, name: "Projects" }),
        ).toBeInTheDocument();
    });

    it("centers the heading text", () => {
        render(<Divider>Projects</Divider>);

        expect(screen.getByRole("heading")).toHaveStyle("text-align: center");
    });

    it("applies a passed className to the divider", () => {
        const { container } = render(
            <Divider className="custom">Projects</Divider>,
        );

        expect(container.firstElementChild).toHaveClass("custom");
    });
});
