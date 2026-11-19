import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("Button", () => {
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

    it("uses aria-label as accessible name", () => {
        render(
            <Button onClick={vi.fn()} aria-label="Close popup">
                <span aria-hidden="true">x</span>
            </Button>,
        );

        expect(
            screen.getByRole("button", { name: "Close popup" }),
        ).toBeInTheDocument();
    });
});
