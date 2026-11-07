import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Link from ".";

describe("Link", () => {
    it("renders an anchor with href and children", () => {
        render(<Link href="/julian">About</Link>);

        expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
            "href",
            "/julian",
        );
    });

    it("passes target through", () => {
        render(
            <Link href="https://example.com" target="_blank">
                External
            </Link>,
        );

        expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("sets rel noopener noreferrer for target _blank", () => {
        render(
            <Link href="https://example.com" target="_blank">
                External
            </Link>,
        );

        expect(screen.getByRole("link")).toHaveAttribute(
            "rel",
            "noopener noreferrer",
        );
    });

    it("sets no rel without target _blank", () => {
        render(<Link href="/julian">About</Link>);

        expect(screen.getByRole("link")).not.toHaveAttribute("rel");
    });

    it("calls onClick on click", async () => {
        const onClick = vi.fn();
        render(
            <Link href="#" onClick={onClick}>
                Click
            </Link>,
        );

        await userEvent.click(screen.getByRole("link"));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is underlined by default and not when underline is false", () => {
        const { rerender } = render(<Link href="/">Home</Link>);
        expect(screen.getByRole("link")).toHaveStyle("text-decoration: underline");

        rerender(
            <Link href="/" underline={false}>
                Home
            </Link>,
        );
        expect(screen.getByRole("link")).toHaveStyle("text-decoration: none");
    });

    it("is reachable via keyboard", async () => {
        render(<Link href="/">Home</Link>);

        await userEvent.tab();

        expect(screen.getByRole("link")).toHaveFocus();
    });

    it("sets aria-current only when ariaCurrent is given", () => {
        const { rerender } = render(<Link href="/">Home</Link>);
        expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");

        rerender(
            <Link href="/" ariaCurrent="page">
                Home
            </Link>,
        );
        expect(screen.getByRole("link")).toHaveAttribute(
            "aria-current",
            "page",
        );
    });
});
