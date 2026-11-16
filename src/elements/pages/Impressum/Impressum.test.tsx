import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Impressum from "./Impressum";

vi.mock("data/languageData", () => ({
    languageData: { impressum: "Legal notice text" },
}));

describe("Impressum", () => {
    it("renders the legal notice text and marks it as german", () => {
        render(<Impressum />);

        expect(
            screen.getByText("Legal notice text").closest("[lang]"),
        ).toHaveAttribute("lang", "de");
    });
});
