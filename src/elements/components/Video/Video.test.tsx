import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Video from "./Video";

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

    it("calls onClick when the video is clicked", async () => {
        const onClick = vi.fn();
        renderVideo({ onClick });

        await userEvent.click(screen.getByLabelText("Showreel"));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("mutes the video via the muted prop", () => {
        const { videoRef, rerender } = renderVideo({ muted: true });
        expect(videoRef.current?.muted).toBe(true);

        rerender(
            <Video
                videoRef={videoRef}
                src="/clip.mp4"
                poster="/poster.jpg"
                ariaLabel="Showreel"
                muted={false}
            />,
        );
        expect(videoRef.current?.muted).toBe(false);
    });

    it("prevents the context menu on the video", () => {
        renderVideo();

        const notPrevented = fireEvent.contextMenu(
            screen.getByLabelText("Showreel"),
        );

        expect(notPrevented).toBe(false);
    });
});
