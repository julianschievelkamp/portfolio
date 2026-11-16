import { RefObject, useEffect, useState } from "react";
import { useGaplessAudio } from "./useGaplessAudio";

export const useVideoPlayback = (
    videoRef: RefObject<HTMLVideoElement | null>,
    audioSrc?: string,
) => {
    const [hasStarted, setHasStarted] = useState(false);
    const { prepare, start, stop, isPlaying } = useGaplessAudio(audioSrc);

    const toggleVideo = () => {
        if (videoRef.current?.paused) {
            if (!hasStarted) {
                setHasStarted(true);
            }

            // Entsperrt den AudioContext im Klick; gestartet wird das Audio erst beim "playing"-Event
            prepare();

            videoRef.current.play();
        } else {
            videoRef.current?.pause();
        }
    };

    // Das Audio startet an der Videoposition und loopt danach unabhängig weiter.
    useEffect(() => {
        const video = videoRef.current;

        if (!video || !audioSrc) return;

        // Der Video-Loop löst "playing" erneut aus, ein laufender Audio-Loop bleibt aber unberührt
        const startAudio = () => {
            if (!isPlaying()) start(() => video.currentTime);
        };

        video.addEventListener("playing", startAudio);
        video.addEventListener("pause", stop);

        return () => {
            video.removeEventListener("playing", startAudio);
            video.removeEventListener("pause", stop);
            stop();
        };
    }, [videoRef, audioSrc, start, stop, isPlaying]);

    return { videoRef, toggleVideo, hasStarted };
};
