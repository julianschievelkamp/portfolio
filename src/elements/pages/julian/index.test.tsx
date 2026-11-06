import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Julian from ".";

vi.mock("./parts/artist", () => ({ default: () => <p>artist</p> }));
vi.mock("./parts/references", () => ({ default: () => <p>references</p> }));
vi.mock("./parts/badges", () => ({ default: () => <p>badges</p> }));

describe("Julian", () => {
    it("renders artist, references and badges in this order", () => {
        render(<Julian />);

        expect(
            screen.getAllByText(/artist|references|badges/).map((e) => e.textContent),
        ).toEqual(["artist", "references", "badges"]);
    });
});
