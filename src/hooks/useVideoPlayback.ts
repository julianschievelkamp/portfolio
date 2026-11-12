import { useEffect, useRef, useState } from "react";
import { useStore } from "./useStore";

export const useVideoPlayback = (src: string) => {
    const popupOpen = useStore((state) => state.popupOpen);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    // Bei einem Quellenwechsel gilt das Video so automatisch wieder als nicht gestartet.
    const [startedSrc, setStartedSrc] = useState<string | null>(null);

    const toggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    };

    useEffect(() => {
        const video = videoRef?.current;
        const handlePlay = () => setStartedSrc(src);

        video?.addEventListener("play", handlePlay);

        return () => video?.removeEventListener("play", handlePlay);
    }, [videoRef, src]);

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    return { videoRef, toggleVideo, isStarted: startedSrc === src };
};
