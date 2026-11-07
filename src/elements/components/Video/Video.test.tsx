import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Video from ".";

const renderVideo = (props: Partial<React.ComponentProps<typeof Video>> = {}) => {
    const videoRef = createRef<HTMLVideoElement>();
    const result = render(
        <Video
            videoRef={videoRef}
            src="/clip.mp4"
            poster="/poster.jpg"
            ariaLabel="Showreel"
            {...props}
        />,
    );
    return { videoRef, ...result };
};

describe("Video", () => {
    beforeEach(() => {
        // jsdom implementiert play/pause nicht
        vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            () => {},
        );
    });

    it("renders the video with source, poster and label", () => {
        const { container } = renderVideo();

        const video = screen.getByLabelText("Showreel");
        expect(video.tagName).toBe("VIDEO");
        expect(video).toHaveAttribute("poster", "/poster.jpg");
        expect(container.querySelector("source")).toHaveAttribute(
            "src",
            "/clip.mp4",
        );
        expect(container.querySelector("source")).toHaveAttribute(
            "type",
            "video/mp4",
        );
    });

    it("attaches the passed ref to the video element", () => {
        const { videoRef } = renderVideo();

        expect(videoRef.current).toBeInstanceOf(HTMLVideoElement);
    });

    it("shows the play icon before the video has started", () => {
        const { container } = renderVideo();

        expect(container.querySelector("button svg")).toBeInTheDocument();
    });

    it("hides the play icon after the play event", () => {
        const { container, videoRef } = renderVideo();

        act(() => {
            fireEvent.play(videoRef.current as HTMLVideoElement);
        });

        expect(container.querySelector("button svg")).not.toBeInTheDocument();
    });

    it("shows the play icon again and keeps listening after the src changes", () => {
        const { container, videoRef, rerender } = renderVideo();
        act(() => {
            fireEvent.play(videoRef.current as HTMLVideoElement);
        });
        expect(container.querySelector("button svg")).not.toBeInTheDocument();

        rerender(
            <Video
                videoRef={videoRef}
                src="/other.mp4"
                poster="/poster.jpg"
                ariaLabel="Showreel"
            />,
        );
        expect(container.querySelector("button svg")).toBeInTheDocument();

        act(() => {
            fireEvent.play(videoRef.current as HTMLVideoElement);
        });
        expect(container.querySelector("button svg")).not.toBeInTheDocument();
    });

    it("plays a paused video on click", async () => {
        renderVideo();

        await userEvent.click(screen.getByRole("button"));

        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
        expect(HTMLMediaElement.prototype.pause).not.toHaveBeenCalled();
    });

    it("pauses a playing video on click", async () => {
        const { videoRef } = renderVideo();
        Object.defineProperty(videoRef.current, "paused", {
            value: false,
            configurable: true,
        });

        await userEvent.click(screen.getByRole("button"));

        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
        expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    });

    it("prevents the context menu on the video", () => {
        renderVideo();

        const notPrevented = fireEvent.contextMenu(
            screen.getByLabelText("Showreel"),
        );

        expect(notPrevented).toBe(false);
    });
});
