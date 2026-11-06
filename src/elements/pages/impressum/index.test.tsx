import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Impressum from ".";

vi.mock("data/languageData", () => ({
    languageData: { impressum: "Legal notice text" },
}));

describe("Impressum", () => {
    it("renders the legal notice text", () => {
        render(<Impressum />);

        expect(screen.getByText("Legal notice text")).toBeInTheDocument();
    });
});
