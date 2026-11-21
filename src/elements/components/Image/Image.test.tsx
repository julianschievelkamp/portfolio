import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Image from "./Image";

describe("Image", () => {
    it("renders an image with src and alt", () => {
        render(<Image alt="Abstract painting" src="/art.jpg" />);

        const image = screen.getByRole("img", { name: "Abstract painting" });
        expect(image).toHaveAttribute("src", "/art.jpg");
    });

    it("passes srcSet and sizes through and applies width and height as styles", () => {
        render(
            <Image
                alt="Abstract painting"
                height="200px"
                sizes="300px"
                src="/art.jpg"
                srcSet="/art-300.jpg 300w"
                width="300px"
            />,
        );

        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("srcset", "/art-300.jpg 300w");
        expect(image).toHaveAttribute("sizes", "300px");
        expect(image).toHaveStyle({ width: "300px", height: "200px" });
    });

    it("loads eagerly by default and supports lazy loading", () => {
        const { rerender } = render(<Image alt="Art" src="/a.jpg" />);
        expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");

        rerender(<Image alt="Art" loading="lazy" src="/a.jpg" />);
        expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
    });

    it("passes fetchPriority through", () => {
        render(<Image alt="Art" fetchPriority="high" src="/a.jpg" />);

        expect(screen.getByRole("img")).toHaveAttribute(
            "fetchpriority",
            "high",
        );
    });

    it("calls onLoad after the load event", () => {
        const onLoad = vi.fn();
        render(<Image alt="Art" src="/a.jpg" onLoad={onLoad} />);

        fireEvent.load(screen.getByRole("img"));

        expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it("calls onError after the error event", () => {
        const onError = vi.fn();
        render(<Image alt="Art" src="/a.jpg" onError={onError} />);

        fireEvent.error(screen.getByRole("img"));

        expect(onError).toHaveBeenCalledTimes(1);
    });

    it("hides the image until it is loaded when fadeInOnLoad is set", () => {
        render(<Image alt="Art" fadeInOnLoad src="/a.jpg" />);
        const image = screen.getByRole("img");
        expect(image).toHaveStyle("opacity: 0");

        fireEvent.load(image);

        expect(image).not.toHaveStyle("opacity: 0");
    });

    it("keeps the image visible while loading without fadeInOnLoad", () => {
        render(<Image alt="Art" src="/a.jpg" />);

        expect(screen.getByRole("img")).not.toHaveStyle("opacity: 0");
    });

    it("shows a cached image immediately when it is already complete on mount", () => {
        // jsdom does not load images, so "complete" is simulated for this test
        const completeSpy = vi
            .spyOn(HTMLImageElement.prototype, "complete", "get")
            .mockReturnValue(true);

        render(<Image alt="Art" fadeInOnLoad src="/a.jpg" />);

        expect(screen.getByRole("img")).not.toHaveStyle("opacity: 0");

        completeSpy.mockRestore();
    });
});
