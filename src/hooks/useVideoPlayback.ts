import { RefObject, useEffect, useState } from "react";
import { useGaplessAudio } from "./useGaplessAudio";

export const useVideoPlayback = (
    videoRef: RefObject<HTMLVideoElement | null>,
    audioSrc?: string,
) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    const { prepare, start, stop, isPlaying } = useGaplessAudio(audioSrc);

    const toggleVideo = () => {
        if (videoRef.current?.paused) {
            // Entsperrt den AudioContext im Klick; gestartet wird das Audio erst beim "playing"-Event
            prepare();

            // Lehnt der Browser das Abspielen ab, bleibt das Video einfach pausiert
            videoRef.current.play().catch(() => undefined);
        } else {
            videoRef.current?.pause();
        }
    };

    // Hält die Zustände über die nativen Video-Events synchron
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

    // Das Audio startet an der Videoposition und loopt danach unabhängig weiter.
    useEffect(() => {
        const video = videoRef.current;

        if (!video || !audioSrc) return;

        // Der Video-Loop löst "playing" erneut aus, ein laufender Audio-Loop bleibt aber unberührt
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

    return { videoRef, toggleVideo, hasStarted, isPaused };
};
