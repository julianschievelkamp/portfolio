import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Video from "./Video";

// Das Icon wird durch seinen Namen ersetzt, damit der Wechsel prüfbar ist
vi.mock("elements/components/Icon/Icon", () => ({
    default: ({ name }: { name: string }) => <span data-testid={name} />,
}));

// jsdom kennt die Web Audio API nicht, daher wird sie nachgebildet
const sourceStart = vi.fn();
const sourceStop = vi.fn();
const gainSet = vi.fn();
const gainRamp = vi.fn();
let createdSources: { loop: boolean }[] = [];
let fakeContexts: object[] = [];

class FakeAudioContext {
    state = "running";
    currentTime = 0;
    destination = {};
    resume = vi.fn().mockResolvedValue(undefined);
    close = vi.fn().mockResolvedValue(undefined);
    decodeAudioData = vi.fn().mockResolvedValue({ duration: 60 });

    constructor() {
        fakeContexts.push(this);
    }

    createGain() {
        const gain = {
            gain: {
                value: 1,
                setValueAtTime: gainSet,
                linearRampToValueAtTime: gainRamp,
                cancelScheduledValues: vi.fn(),
            },
            connect: vi.fn(),
            disconnect: vi.fn(),
        };
        return gain;
    }

    createBufferSource() {
        const source = {
            buffer: null,
            loop: false,
            connect: vi.fn(),
            disconnect: vi.fn(),
            start: sourceStart,
            stop: sourceStop,
            onended: null,
        };
        createdSources.push(source);
        return source;
    }
}

const renderVideo = (audio?: string, isActive = true) =>
    render(
        <Video
            src="/clip.mp4"
            ariaLabel="Showreel"
            width="100%"
            height="100%"
            audio={audio}
            isActive={isActive}
        />,
    );

const getVideo = () => screen.getByLabelText("Showreel") as HTMLVideoElement;
const getPlayButton = () => screen.getByLabelText("Play Showreel");
const getPauseButton = () => screen.getByLabelText("Pause Showreel");

describe("Video", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    beforeEach(() => {
        sourceStart.mockClear();
        sourceStop.mockClear();
        gainSet.mockClear();
        gainRamp.mockClear();
        createdSources = [];
        fakeContexts = [];
        vi.stubGlobal("AudioContext", FakeAudioContext);
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
            }),
        );

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
                src="/clip.mp4"
                ariaLabel="Showreel"
                audio={undefined}
                isActive={false}
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

    it("does not touch the Web Audio API without an audio source", async () => {
        renderVideo();

        await userEvent.click(getPlayButton());

        expect(fakeContexts).toHaveLength(0);
        expect(fetch).not.toHaveBeenCalled();
    });

    it("loads the audio on play and loops it without gaps once the video plays", async () => {
        renderVideo("/clip.ogg");
        const video = getVideo();
        video.currentTime = 5;

        await userEvent.click(getPlayButton());
        expect(fetch).toHaveBeenCalledWith("/clip.ogg");

        fireEvent(video, new Event("playing"));

        await waitFor(() => expect(sourceStart).toHaveBeenCalledWith(0, 5));
    });

    it("crossfades into the next loop pass before the file ends", async () => {
        renderVideo("/clip.ogg");
        const video = getVideo();
        // Dauer der Datei ist 60 s, es bleiben also 10 s bis zum Ende
        video.currentTime = 50;

        await userEvent.click(getPlayButton());
        fireEvent(video, new Event("playing"));

        await waitFor(() => expect(sourceStart).toHaveBeenCalledTimes(2));

        // Der zweite Durchlauf beginnt vor dem Ende des ersten (10 s - Überblendung)
        const [secondStart, secondOffset] = sourceStart.mock.calls[1];
        expect(secondStart).toBeLessThan(10);
        expect(secondStart).toBeGreaterThan(9);
        expect(secondOffset).toBe(0);
    });

    it("stops the audio when the video is paused", async () => {
        renderVideo("/clip.ogg");
        await userEvent.click(getPlayButton());
        fireEvent(getVideo(), new Event("playing"));
        await waitFor(() => expect(sourceStart).toHaveBeenCalledTimes(1));

        // Das Ende des Durchlaufs ist bereits eingeplant, das Ausblenden kommt danach
        sourceStop.mockClear();
        await userEvent.click(getVideo());

        expect(sourceStop).toHaveBeenCalledTimes(1);
    });

    it("stops the audio when the video is paused from outside", async () => {
        renderVideo("/clip.ogg");
        await userEvent.click(getPlayButton());
        fireEvent(getVideo(), new Event("playing"));
        await waitFor(() => expect(sourceStart).toHaveBeenCalledTimes(1));

        sourceStop.mockClear();
        act(() => getVideo().pause());

        expect(sourceStop).toHaveBeenCalledTimes(1);
    });

    it("does not interrupt the audio loop when the video loops", async () => {
        renderVideo("/clip.ogg");
        const video = getVideo();
        await userEvent.click(getPlayButton());
        fireEvent(video, new Event("playing"));
        await waitFor(() => expect(sourceStart).toHaveBeenCalledTimes(1));

        sourceStop.mockClear();

        // Der Video-Loop löst "playing" und "seeked" erneut aus
        fireEvent(video, new Event("seeked"));
        fireEvent(video, new Event("playing"));

        expect(sourceStart).toHaveBeenCalledTimes(1);
        expect(sourceStop).not.toHaveBeenCalled();
    });

    it("fades the audio in on start and out on stop to avoid clicks", async () => {
        renderVideo("/clip.ogg");
        await userEvent.click(getPlayButton());
        fireEvent(getVideo(), new Event("playing"));
        await waitFor(() => expect(sourceStart).toHaveBeenCalledTimes(1));

        // Einblenden: von 0 auf 1
        expect(gainSet).toHaveBeenCalledWith(0, expect.any(Number));
        expect(gainRamp).toHaveBeenCalledWith(1, expect.any(Number));

        await userEvent.click(getVideo());

        // Ausblenden auf 0, die Quelle stoppt erst nach der Rampe
        expect(gainRamp).toHaveBeenLastCalledWith(0, expect.any(Number));
        expect(sourceStop).toHaveBeenCalledWith(expect.any(Number));
    });
});
