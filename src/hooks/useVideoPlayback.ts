import { useEffect, useRef, useState } from "react";
import { useStore } from "./useStore";

export const useVideoPlayback = () => {
    const popupOpen = useStore((state) => state.popupOpen);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isStarted, setIsStarted] = useState(false);

    const toggleVideo = () => {
        setIsStarted(true);

        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    };

    useEffect(() => {
        if (!popupOpen) {
            videoRef?.current?.pause();
        }
    }, [popupOpen]);

    return { videoRef, toggleVideo, isStarted };
};
