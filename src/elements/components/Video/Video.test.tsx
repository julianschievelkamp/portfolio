import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Video from "./Video";

// Das Icon wird durch seinen Namen ersetzt, damit der Wechsel prüfbar ist
vi.mock("elements/components/Icon/Icon", () => ({
    default: ({ name }: { name: string }) => <span data-testid={name} />,
}));

// Die Audio-Logik ist in useGaplessAudio getestet, hier zählt nur die Anbindung ans Video
const audio = vi.hoisted(() => ({
    prepare: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    isPlaying: vi.fn(),
}));
vi.mock("hooks/useGaplessAudio/useGaplessAudio", () => ({
    useGaplessAudio: () => audio,
}));

const renderVideo = (audio?: string, isActive = true) =>
    render(
        <Video
            ariaLabel="Showreel"
            audio={audio}
            height="100%"
            isActive={isActive}
            src="/clip.mp4"
            width="100%"
        />,
    );

const getVideo = () => screen.getByLabelText("Showreel") as HTMLVideoElement;
const getPlayButton = () => screen.getByLabelText("Play Showreel");
const getPauseButton = () => screen.getByLabelText("Pause Showreel");

describe("Video", () => {
    beforeEach(() => {
        audio.prepare.mockReset().mockResolvedValue(null);
        audio.start.mockReset().mockResolvedValue(undefined);
        audio.stop.mockReset();
        audio.isPlaying.mockReset().mockReturnValue(false);

        // jsdom implementiert play/pause nicht, daher wird der Wiedergabezustand nachgebildet
        let isPaused = true;
        vi.spyOn(
            HTMLMediaElement.prototype,
            "paused",
            "get",
        ).mockImplementation(() => isPaused);
        vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
            isPaused = false;
            // Wie im Browser feuert play() das "play"-Event
            act(() => {
                document
                    .querySelector("video")
                    ?.dispatchEvent(new Event("play"));
            });
            return Promise.resolve();
        });
        vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(
            function (this: HTMLMediaElement) {
                isPaused = true;
                // Wie im Browser feuert pause() das "pause"-Event
                this.dispatchEvent(new Event("pause"));
            },
        );
    });

    it("renders the video with source and label", () => {
        const { container } = renderVideo();

        const video = getVideo();
        expect(video.tagName).toBe("VIDEO");
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

        expect(getPauseButton()).not.toBeVisible();
    });

    it("switches icon and label between play and pause with the playback state", async () => {
        renderVideo();
        expect(screen.getByTestId("play")).toBeInTheDocument();

        await userEvent.click(getVideo());
        expect(screen.getByTestId("pause")).toBeInTheDocument();
        expect(screen.queryByTestId("play")).not.toBeInTheDocument();
        expect(getPauseButton()).toBeInTheDocument();

        await userEvent.click(getVideo());
        expect(screen.getByTestId("play")).toBeInTheDocument();
        expect(getPlayButton()).toBeInTheDocument();
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
        expect(getPauseButton()).not.toBeVisible();

        await userEvent.click(getVideo());
        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
    });

    it("pauses the playing video when it becomes inactive", async () => {
        const { rerender } = renderVideo();
        await userEvent.click(getVideo());
        expect(HTMLMediaElement.prototype.pause).not.toHaveBeenCalled();

        rerender(
            <Video
                ariaLabel="Showreel"
                audio={undefined}
                isActive={false}
                src="/clip.mp4"
            />,
        );

        expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1);
        expect(getPlayButton()).toBeInTheDocument();
    });

    it("prevents the context menu on the video", () => {
        renderVideo();

        const notPrevented = fireEvent.contextMenu(getVideo());

        expect(notPrevented).toBe(false);
    });

    it("does not start any audio without an audio source", async () => {
        renderVideo();

        await userEvent.click(getPlayButton());
        fireEvent(getVideo(), new Event("playing"));

        expect(audio.prepare).toHaveBeenCalledTimes(1);
        expect(audio.start).not.toHaveBeenCalled();
    });

    it("prepares the audio on play and starts it at the video position once the video plays", async () => {
        renderVideo("/clip.ogg");
        const video = getVideo();
        video.currentTime = 5;

        await userEvent.click(getPlayButton());
        expect(audio.prepare).toHaveBeenCalledTimes(1);
        expect(audio.start).not.toHaveBeenCalled();

        fireEvent(video, new Event("playing"));

        expect(audio.start).toHaveBeenCalledTimes(1);
        expect(audio.start.mock.calls[0][0]()).toBe(5);
    });

    it("does not restart a running audio loop when the video loops", async () => {
        renderVideo("/clip.ogg");
        audio.isPlaying.mockReturnValue(true);

        await userEvent.click(getPlayButton());
        fireEvent(getVideo(), new Event("playing"));

        expect(audio.start).not.toHaveBeenCalled();
    });

    it("stops the audio when the video is paused", async () => {
        renderVideo("/clip.ogg");
        await userEvent.click(getVideo());
        audio.stop.mockClear();

        await userEvent.click(getVideo());

        expect(audio.stop).toHaveBeenCalledTimes(1);
    });

    it("stops the audio when the video is paused from outside", async () => {
        renderVideo("/clip.ogg");
        await userEvent.click(getVideo());
        audio.stop.mockClear();

        act(() => getVideo().pause());

        expect(audio.stop).toHaveBeenCalledTimes(1);
    });
});
