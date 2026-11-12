import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("Button", () => {
    it("renders its children", () => {
        render(<Button onClick={vi.fn()}>Open</Button>);

        expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    });

    it("calls onClick on click", async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Open</Button>);

        await userEvent.click(screen.getByRole("button"));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("can be activated with the keyboard", async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Open</Button>);

        await userEvent.tab();
        await userEvent.keyboard("{Enter}");
        await userEvent.keyboard(" ");

        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("uses ariaLabel as accessible name", () => {
        render(
            <Button onClick={vi.fn()} ariaLabel="Close popup">
                <span aria-hidden="true">x</span>
            </Button>,
        );

        expect(
            screen.getByRole("button", { name: "Close popup" }),
        ).toBeInTheDocument();
    });

    it("calls onFocus when focused", async () => {
        const onFocus = vi.fn();
        render(
            <Button onClick={vi.fn()} onFocus={onFocus}>
                Open
            </Button>,
        );

        await userEvent.tab();

        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it("passes className through", () => {
        render(
            <Button onClick={vi.fn()} className="custom">
                Open
            </Button>,
        );

        expect(screen.getByRole("button")).toHaveClass("custom");
    });
});
