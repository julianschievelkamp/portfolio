import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Image from "./Image";

describe("Image", () => {
    it("renders an image with src and alt", () => {
        render(<Image src="/art.jpg" alt="Abstract painting" />);

        const image = screen.getByRole("img", { name: "Abstract painting" });
        expect(image).toHaveAttribute("src", "/art.jpg");
    });

    it("passes srcSet, sizes, width and height through", () => {
        render(
            <Image
                src="/art.jpg"
                alt="Abstract painting"
                srcSet="/art-300.jpg 300w"
                sizes="300px"
                width="300"
                height="200"
            />,
        );

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("srcset", "/art-300.jpg 300w");
        expect(image).toHaveAttribute("sizes", "300px");
        expect(image).toHaveAttribute("width", "300");
        expect(image).toHaveAttribute("height", "200");
    });

    it("loads eagerly by default and supports lazy loading", () => {
        const { rerender } = render(<Image src="/a.jpg" alt="Art" />);
        expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");

        rerender(<Image src="/a.jpg" alt="Art" loading="lazy" />);
        expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    });

    it("calls onLoad after the load event", () => {
        const onLoad = vi.fn();
        render(<Image src="/a.jpg" alt="Art" onLoad={onLoad} />);

        fireEvent.load(screen.getByRole("img"));

        expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it("calls onError after the error event", () => {
        const onError = vi.fn();
        render(<Image src="/a.jpg" alt="Art" onError={onError} />);

        fireEvent.error(screen.getByRole("img"));

        expect(onError).toHaveBeenCalledTimes(1);
    });

    it("is visible immediately without fadeInOnLoad", () => {
        render(<Image src="/a.jpg" alt="Art" />);

        expect(screen.getByRole("img")).toHaveStyle("opacity: 1");
    });

    it("fades in after loading when fadeInOnLoad is set", () => {
        render(<Image src="/a.jpg" alt="Art" fadeInOnLoad />);
        const image = screen.getByRole("img");
        // jsdom lädt keine Bilder, daher ist "complete" hier nicht gesetzt
        expect(image).toHaveStyle("opacity: 0");

        fireEvent.load(image);

        expect(image).toHaveStyle("opacity: 1");
    });

    it("shows a cached image immediately when it is already complete on mount", () => {
        // jsdom lädt keine Bilder, daher wird "complete" für diesen Test simuliert
        const completeSpy = vi
            .spyOn(HTMLImageElement.prototype, "complete", "get")
            .mockReturnValue(true);

        render(<Image src="/a.jpg" alt="Art" fadeInOnLoad />);

        expect(screen.getByRole("img")).toHaveStyle("opacity: 1");

        completeSpy.mockRestore();
    });
});
