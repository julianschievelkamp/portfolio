import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Impressum from "./Impressum";

vi.mock("data/languageData", () => ({
    languageData: { impressum: "Legal notice text" },
}));

describe("Impressum", () => {
    it("renders the legal notice text", () => {
        render(<Impressum />);

        expect(screen.getByText("Legal notice text")).toBeInTheDocument();
    });

    it("marks the german text with lang de", () => {
        render(<Impressum />);

        expect(screen.getByText("Legal notice text").closest("[lang]")).toHaveAttribute(
            "lang",
            "de",
        );
    });
});
