import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useStore } from "hooks/useStore";
import Video from "./Video";

const renderVideo = () =>
    render(<Video src="/clip.mp4" poster="/poster.jpg" ariaLabel="Showreel" />);

const getVideo = () => screen.getByLabelText("Showreel") as HTMLVideoElement;
const getPlayButton = () => screen.getByLabelText("Play Video");

describe("Video", () => {
    beforeEach(() => {
        useStore.setState({ popupOpen: true });

        // jsdom implementiert play/pause nicht, daher wird der Wiedergabezustand nachgebildet
        let isPaused = true;
        vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(
            () => isPaused,
        );
        vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
            isPaused = false;
            return Promise.resolve();
        });
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            () => {
                isPaused = true;
            },
        );
    });

    it("renders the video with source, poster and label", () => {
        const { container } = renderVideo();

        const video = getVideo();
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

    it("shows the play button until the video has been started", async () => {
        renderVideo();
        expect(getPlayButton()).toBeVisible();

        await userEvent.click(getPlayButton());

        expect(getPlayButton()).not.toBeVisible();
    });

    it("plays the video via the play button", async () => {
        renderVideo();

        await userEvent.click(getPlayButton());

        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    });

    it("plays and pauses the video when it is clicked", async () => {
        renderVideo();

        await userEvent.click(getVideo());
        expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
        expect(getPlayButton()).not.toBeVisible();

        await userEvent.click(getVideo());
        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
    });

    it("pauses the video when the popup is closed", async () => {
        renderVideo();
        await userEvent.click(getPlayButton());

        act(() => useStore.setState({ popupOpen: false }));

        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
        expect(getVideo().paused).toBe(true);
    });

    it("prevents the context menu on the video", () => {
        renderVideo();

        const notPrevented = fireEvent.contextMenu(getVideo());

        expect(notPrevented).toBe(false);
    });
});
