import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import References from "./References";

vi.mock("data/languageData", () => ({
    languageData: {
        references: {
            headline: "REFERENCES",
            publications: {
                title: "Publications",
                subTitle: "2015—present",
                listEntries1: ["Pub A", "Pub B"],
                listEntries2: ["Pub C"],
                listEntries3: ["Pub D", "Pub E", "Pub F"],
            },
            awards: {
                title: "Awards",
                subTitle: "2016—2019",
                listEntries1: ["Award A"],
                listEntries2: ["Award B", "Award C"],
            },
        },
    },
}));

describe("References", () => {
    it("shows the headline", () => {
        render(<References />);

        expect(
            screen.getByRole("heading", { level: 2, name: "REFERENCES" }),
        ).toBeInTheDocument();
    });

    it("shows title and subtitle of publications and awards", () => {
        render(<References />);

        ["Publications", "2015—present", "Awards", "2016—2019"].forEach(
            (text) => {
                expect(screen.getByText(text)).toBeInTheDocument();
            },
        );
    });

    it("renders all list groups with their entries", () => {
        render(<References />);

        const lists = screen.getAllByRole("list");

        expect(
            lists.map((list) => within(list).getAllByRole("listitem").length),
        ).toEqual([2, 1, 3, 1, 2]);
        ["Pub A", "Pub F", "Award A", "Award C"].forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
});
