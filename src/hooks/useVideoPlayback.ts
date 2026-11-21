import { type RefObject, useEffect, useState } from "react";

import { useGaplessAudio } from "hooks/useGaplessAudio/useGaplessAudio";

export const useVideoPlayback = (
    videoRef: RefObject<HTMLVideoElement | null>,
    audioSrc?: string,
    isActive = true,
) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    const { isPlaying, prepare, start, stop } = useGaplessAudio(audioSrc);

    const toggleVideo = () => {
        if (videoRef.current?.paused) {
            // Unlocks the AudioContext in the click; audio only starts on the "playing" event
            prepare();

            // If the browser rejects playback, the video simply stays paused
            videoRef.current.play().catch(() => undefined);
        } else {
            videoRef.current?.pause();
        }
    };

    // An inactive video (e.g. when the popup is closed) is paused
    useEffect(() => {
        if (!isActive) {
            videoRef.current?.pause();
        }
    }, [isActive, videoRef]);

    // Keeps the states in sync via the native video events
    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handlePlay = () => {
            setHasStarted(true);
            setIsPaused(false);
        };

        const handlePause = () => setIsPaused(true);

        setIsPaused(video.paused);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, [videoRef]);

    // The audio starts at the video position and then loops independently.
    useEffect(() => {
        const video = videoRef.current;

        if (!video || !audioSrc) return;

        // The video loop triggers "playing" again, but a running audio loop stays untouched
        const startAudio = () => {
            if (!isPlaying()) {
                start(() => video.currentTime);
            }
        };

        video.addEventListener("playing", startAudio);
        video.addEventListener("pause", stop);

        return () => {
            video.removeEventListener("playing", startAudio);
            video.removeEventListener("pause", stop);
            stop();
        };
    }, [videoRef, audioSrc, start, stop, isPlaying]);

    return { toggleVideo, hasStarted, isPaused };
};
