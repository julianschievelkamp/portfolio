import { useCallback, useEffect, useRef } from "react";

// Short fade-in and fade-out in seconds so start and stop in the middle of the wave do not click
const FADE_IN_SECONDS = 0.02;
const FADE_OUT_SECONDS = 0.03;
// Longer fade-in on the very first start by the user in seconds
const INITIAL_FADE_IN_SECONDS = 1;
// Duration of the crossfade between the end and start of the loop in seconds (adjustable for testing)
const CROSSFADE_SECONDS = 0.1;
// How far ahead runs are scheduled and how often rescheduling happens
const LOOKAHEAD_SECONDS = 20;
const SCHEDULER_INTERVAL_MS = 1000;

// The Audio Session API (Safari 16.4+) is not yet part of the TypeScript DOM types
interface AudioSession {
    type:
        | "auto"
        | "playback"
        | "transient"
        | "transient-solo"
        | "ambient"
        | "play-and-record";
}

type NavigatorWithAudioSession = Navigator & { audioSession?: AudioSession };

interface PlayingSource {
    gain: GainNode;
    source: AudioBufferSourceNode;
}

// A running loop consists of several scheduled runs that crossfade
interface PlayingLoop {
    timer: ReturnType<typeof setInterval>;
    voices: Set<PlayingSource>;
}

// Plays an audio file in a gapless loop (Web Audio API).
// Depending on the browser, an <audio loop> element produces an audible pause at the loop point.
// Each run is scheduled individually and crossfaded with the next one,
// so files with a silent ending also blend into each other cleanly.
export const useGaplessAudio = (src?: string) => {
    const contextRef = useRef<AudioContext | null>(null);
    const bufferPromiseRef = useRef<Promise<AudioBuffer | null> | null>(null);
    const playingRef = useRef<PlayingLoop | null>(null);
    // Incremented on every start/stop so outdated asynchronous starts are discarded
    const requestRef = useRef(0);
    // Remembers whether the sound has already been started once (only the first start fades in slowly)
    const hasStartedRef = useRef(false);

    const stop = useCallback(() => {
        requestRef.current += 1;

        const context = contextRef.current;
        const playing = playingRef.current;
        if (!playing || !context) return;

        clearInterval(playing.timer);

        const now = context.currentTime;
        const stopTime = now + FADE_OUT_SECONDS;

        // All runs fade out on detached references, a new start is possible immediately
        playing.voices.forEach(({ gain, source }) => {
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(gain.gain.value, now);
            gain.gain.linearRampToValueAtTime(0, stopTime);
            source.stop(stopTime);
        });

        playingRef.current = null;
    }, []);

    // Must be called within a user interaction (click)
    // so the AudioContext is unlocked. Loads and decodes the file once.
    const prepare = useCallback((): Promise<AudioBuffer | null> => {
        if (!src) return Promise.resolve(null);

        if (!contextRef.current) {
            // iOS dampens Web Audio by default when the silent switch is active ("ambient").
            // "playback" behaves like a <video> element and stays audible.
            const { audioSession } = navigator as NavigatorWithAudioSession;
            if (audioSession) audioSession.type = "playback";

            contextRef.current = new AudioContext();
        }

        const context = contextRef.current;
        context.resume().catch(() => undefined);

        if (!bufferPromiseRef.current) {
            bufferPromiseRef.current = fetch(src)
                .then((response) => response.arrayBuffer())
                .then((data) => context.decodeAudioData(data))
                // Without a loadable audio track the video simply continues silently
                .catch(() => null);
        }

        return bufferPromiseRef.current;
    }, [src]);

    // Starts the loop at the position supplied by the caller (seconds).
    // The position is only read after loading so audio and video stay in sync.
    const start = useCallback(
        async (getOffset: () => number) => {
            stop();
            const request = requestRef.current;

            const buffer = await prepare();
            const context = contextRef.current;

            if (!buffer || !context || request !== requestRef.current) return;

            if (context.state === "suspended") {
                await context.resume().catch(() => undefined);
                if (request !== requestRef.current) return;
            }

            const voices = new Set<PlayingSource>();
            let nextStart = context.currentTime;
            let nextOffset = getOffset() % buffer.duration;
            let nextFadeIn = hasStartedRef.current
                ? FADE_IN_SECONDS
                : INITIAL_FADE_IN_SECONDS;
            hasStartedRef.current = true;

            // Schedules a run from the offset. Its end fades out while the next one fades in.
            const scheduleVoice = () => {
                const remaining = buffer.duration - nextOffset;
                const crossfade = Math.min(CROSSFADE_SECONDS, remaining);
                const startTime = nextStart;
                const endTime = startTime + remaining;
                const fadeOutStart = Math.max(
                    endTime - crossfade,
                    startTime + nextFadeIn,
                );

                const source = context.createBufferSource();
                source.buffer = buffer;

                const gain = context.createGain();
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(1, startTime + nextFadeIn);
                gain.gain.setValueAtTime(1, fadeOutStart);
                gain.gain.linearRampToValueAtTime(0, endTime);

                source.connect(gain);
                gain.connect(context.destination);
                source.start(startTime, nextOffset);
                source.stop(endTime);

                const voice = { source, gain };
                voices.add(voice);
                source.onended = () => {
                    source.disconnect();
                    gain.disconnect();
                    voices.delete(voice);
                };

                // The next run already begins during the crossfade
                nextStart = endTime - crossfade;
                nextOffset = 0;
                nextFadeIn = crossfade;
            };

            // Keeps enough runs scheduled in advance without relying on precise timers
            const fillSchedule = () => {
                while (nextStart < context.currentTime + LOOKAHEAD_SECONDS)
                    scheduleVoice();
            };

            fillSchedule();
            const timer = setInterval(fillSchedule, SCHEDULER_INTERVAL_MS);

            playingRef.current = { voices, timer };
        },
        [prepare, stop],
    );

    const isPlaying = useCallback(() => playingRef.current !== null, []);

    useEffect(() => {
        return () => {
            stop();

            const context = contextRef.current;
            contextRef.current = null;

            // Closing waits for the fade-out, otherwise the sound would be cut off abruptly
            setTimeout(
                () => context?.close().catch(() => undefined),
                FADE_OUT_SECONDS * 1000 + 50,
            );
        };
    }, [stop]);

    return { prepare, start, stop, isPlaying };
};
