import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { portfolioData } from "data/portfolioFixtures";
import Caption from "./Caption";

vi.mock("hooks/useMediaQuery", () => ({ useMediaQuery: () => true }));

const [photo] = portfolioData;

describe("Caption", () => {
    it("renders title and year", () => {
        render(<Caption loadedItem={photo} />);

        expect(
            screen.getByText(`${photo.title}, ${photo.year}`),
        ).toBeInTheDocument();
    });

    it("renders the type of the item", () => {
        render(<Caption loadedItem={photo} />);

        expect(screen.getByText(photo.type)).toBeInTheDocument();
    });
});
