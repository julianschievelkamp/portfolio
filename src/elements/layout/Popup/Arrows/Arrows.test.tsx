import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import { portfolioData } from "data/portfolioFixtures";
import Arrows from ".";

vi.mock("data/portfolioData", async () => await import("data/portfolioFixtures"));

const lastIndex = portfolioData.length - 1;

describe("Arrows", () => {
    beforeEach(() => {
        useStore.setState({ currentPortfolioIndex: 1 });
    });

    it("renders previous and next buttons", () => {
        render(<Arrows />);

        expect(
            screen.getByRole("button", { name: "Previous" }),
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    });

    it("moves to the next and previous item", async () => {
        render(<Arrows />);

        await userEvent.click(screen.getByRole("button", { name: "Next" }));
        expect(useStore.getState().currentPortfolioIndex).toBe(2);

        await userEvent.click(screen.getByRole("button", { name: "Previous" }));
        expect(useStore.getState().currentPortfolioIndex).toBe(1);
    });

    it("wraps around at the end of the list", async () => {
        useStore.setState({ currentPortfolioIndex: lastIndex });
        render(<Arrows />);

        await userEvent.click(screen.getByRole("button", { name: "Next" }));

        expect(useStore.getState().currentPortfolioIndex).toBe(0);
    });

    it("wraps around at the start of the list", async () => {
        useStore.setState({ currentPortfolioIndex: 0 });
        render(<Arrows />);

        await userEvent.click(screen.getByRole("button", { name: "Previous" }));

        expect(useStore.getState().currentPortfolioIndex).toBe(lastIndex);
    });

    it("excludes both buttons from tab navigation", () => {
        render(<Arrows />);

        screen.getAllByRole("button").forEach((button) => {
            expect(button).toHaveAttribute("tabindex", "-1");
        });
    });
});
