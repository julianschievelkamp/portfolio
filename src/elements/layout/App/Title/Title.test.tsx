import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Title from "./Title";

vi.mock("data/languageData", () => ({
    languageData: { title: "Site Title" },
}));

describe("Title", () => {
    it("renders the site title as a link to the start page", () => {
        render(<Title />);

        expect(
            screen.getByRole("link", { name: "Site Title" }),
        ).toHaveAttribute("href", "/");
    });

    it("calls onClick when the link is clicked", async () => {
        const onClick = vi.fn();
        render(<Title onClick={onClick} />);

        await userEvent.click(screen.getByRole("link", { name: "Site Title" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("applies a passed class name to its wrapper", () => {
        render(<Title className="custom" />);

        expect(
            screen.getByRole("link", { name: "Site Title" }).parentElement,
        ).toHaveClass("custom");
    });
});
