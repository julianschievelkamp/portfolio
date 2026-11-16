import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import About from "./About";

vi.mock("./Artist/Artist", () => ({ default: () => <p>artist</p> }));
vi.mock("./References/References", () => ({ default: () => <p>references</p> }));
vi.mock("./Badges/Badges", () => ({ default: () => <p>badges</p> }));

describe("About", () => {
    it("renders artist, references and badges in this order", () => {
        render(<About />);

        expect(
            screen
                .getAllByText(/artist|references|badges/)
                .map((e) => e.textContent),
        ).toEqual(["artist", "references", "badges"]);
    });
});
