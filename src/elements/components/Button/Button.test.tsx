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

    it("does not call onClick when disabled", async () => {
        const onClick = vi.fn();
        render(
            <Button onClick={onClick} disabled>
                Open
            </Button>,
        );

        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByRole("button")).toBeDisabled();
        expect(onClick).not.toHaveBeenCalled();
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

    it("is focusable by default and respects a custom tabIndex", () => {
        const { rerender } = render(<Button onClick={vi.fn()}>Open</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "0");

        rerender(
            <Button onClick={vi.fn()} tabIndex={-1}>
                Open
            </Button>,
        );
        expect(screen.getByRole("button")).toHaveAttribute("tabindex", "-1");
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
