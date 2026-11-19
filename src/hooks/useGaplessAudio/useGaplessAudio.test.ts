import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useGaplessAudio } from "./useGaplessAudio";

// jsdom kennt die Web Audio API nicht, daher wird sie nachgebildet
const BUFFER_DURATION = 60;
const sourceStart = vi.fn();
const sourceStop = vi.fn();
const gainSet = vi.fn();
const gainRamp = vi.fn();
let fakeContexts: FakeAudioContext[] = [];

class FakeAudioContext {
    state = "running";
    currentTime = 0;
    destination = {};
    resume = vi.fn().mockResolvedValue(undefined);
    close = vi.fn().mockResolvedValue(undefined);
    decodeAudioData = vi.fn().mockResolvedValue({ duration: BUFFER_DURATION });

    constructor() {
        fakeContexts.push(this);
    }

    createGain() {
        return {
            gain: {
                value: 1,
                setValueAtTime: gainSet,
                linearRampToValueAtTime: gainRamp,
                cancelScheduledValues: vi.fn(),
            },
            connect: vi.fn(),
            disconnect: vi.fn(),
        };
    }

    createBufferSource() {
        return {
            buffer: null,
            connect: vi.fn(),
            disconnect: vi.fn(),
            start: sourceStart,
            stop: sourceStop,
            onended: null,
        };
    }
}

describe("useGaplessAudio", () => {
    beforeEach(() => {
        sourceStart.mockClear();
        sourceStop.mockClear();
        gainSet.mockClear();
        gainRamp.mockClear();
        fakeContexts = [];
        vi.stubGlobal("AudioContext", FakeAudioContext);
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
            }),
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    it("does not touch the Web Audio API without a source", async () => {
        const { result } = renderHook(() => useGaplessAudio());

        await expect(result.current.prepare()).resolves.toBeNull();
        await act(() => result.current.start(() => 0));

        expect(fakeContexts).toHaveLength(0);
        expect(fetch).not.toHaveBeenCalled();
        expect(result.current.isPlaying()).toBe(false);
    });

    it("loads and decodes the file only once", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        await act(async () => {
            await result.current.prepare();
            await result.current.prepare();
        });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("/clip.ogg");
        expect(fakeContexts).toHaveLength(1);
        expect(fakeContexts[0].decodeAudioData).toHaveBeenCalledTimes(1);
    });

    it("sets the audio session to playback if available", async () => {
        const audioSession = { type: "auto" };
        vi.stubGlobal("navigator", { audioSession });
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        await act(() => result.current.prepare());

        expect(audioSession.type).toBe("playback");
    });

    it("resolves to null if the file cannot be loaded", async () => {
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        await act(async () => {
            await expect(result.current.prepare()).resolves.toBeNull();
            await result.current.start(() => 0);
        });

        expect(sourceStart).not.toHaveBeenCalled();
        expect(result.current.isPlaying()).toBe(false);
    });

    it("starts at the offset given by the caller", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        await act(() => result.current.start(() => 5));

        expect(sourceStart).toHaveBeenCalledWith(0, 5);
        expect(result.current.isPlaying()).toBe(true);
    });

    it("wraps an offset beyond the file duration", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        await act(() => result.current.start(() => BUFFER_DURATION + 7));

        expect(sourceStart).toHaveBeenCalledWith(0, 7);
    });

    it("crossfades into the next pass before the file ends", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        // Von 60 s bleiben ab Sekunde 50 noch 10 s bis zum Ende
        await act(() => result.current.start(() => 50));

        const [secondStart, secondOffset] = sourceStart.mock.calls[1];
        expect(secondStart).toBeLessThan(10);
        expect(secondStart).toBeGreaterThan(9);
        expect(secondOffset).toBe(0);
    });

    it("fades in on start and out on stop to avoid clicks", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));
        await act(() => result.current.start(() => 0));

        expect(gainSet).toHaveBeenCalledWith(0, expect.any(Number));
        expect(gainRamp).toHaveBeenCalledWith(1, expect.any(Number));

        sourceStop.mockClear();
        act(() => result.current.stop());

        expect(gainRamp).toHaveBeenLastCalledWith(0, expect.any(Number));
        expect(sourceStop).toHaveBeenCalledWith(expect.any(Number));
        expect(result.current.isPlaying()).toBe(false);
    });

    it("keeps scheduling passes while playing", async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));
        await act(() => result.current.start(() => 0));
        const scheduled = sourceStart.mock.calls.length;

        fakeContexts[0].currentTime = 100;
        await act(() => vi.advanceTimersByTimeAsync(1000));

        expect(sourceStart.mock.calls.length).toBeGreaterThan(scheduled);
    });

    it("stops scheduling after stop", async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));
        await act(() => result.current.start(() => 0));
        act(() => result.current.stop());
        const scheduled = sourceStart.mock.calls.length;

        fakeContexts[0].currentTime = 100;
        await act(() => vi.advanceTimersByTimeAsync(5000));

        expect(sourceStart).toHaveBeenCalledTimes(scheduled);
    });

    it("discards a start that was stopped while still loading", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));

        await act(async () => {
            const pending = result.current.start(() => 0);
            result.current.stop();
            await pending;
        });

        expect(sourceStart).not.toHaveBeenCalled();
        expect(result.current.isPlaying()).toBe(false);
    });

    it("resumes a suspended context before starting", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));
        await act(() => result.current.prepare());
        fakeContexts[0].state = "suspended";

        await act(() => result.current.start(() => 0));

        expect(fakeContexts[0].resume).toHaveBeenCalled();
        expect(sourceStart).toHaveBeenCalled();
    });

    it("restarts cleanly when started again", async () => {
        const { result } = renderHook(() => useGaplessAudio("/clip.ogg"));
        await act(() => result.current.start(() => 0));
        sourceStop.mockClear();

        await act(() => result.current.start(() => 10));

        // Der erste Loop wurde ausgeblendet, ein neuer läuft
        expect(sourceStop).toHaveBeenCalled();
        expect(sourceStart).toHaveBeenLastCalledWith(
            expect.any(Number),
            expect.any(Number),
        );
        expect(result.current.isPlaying()).toBe(true);
    });

    it("stops and closes the context on unmount", async () => {
        vi.useFakeTimers();
        const { result, unmount } = renderHook(() =>
            useGaplessAudio("/clip.ogg"),
        );
        await act(() => result.current.start(() => 0));
        sourceStop.mockClear();

        unmount();
        expect(sourceStop).toHaveBeenCalled();
        expect(fakeContexts[0].close).not.toHaveBeenCalled();

        // Das Schließen wartet das Ausblenden ab
        await vi.advanceTimersByTimeAsync(200);
        expect(fakeContexts[0].close).toHaveBeenCalledTimes(1);
    });
});
