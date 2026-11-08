import { useEffect, useState } from "react";

export const useVideoPlayback = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
    src: string,
) => {
    // Bei einem Quellenwechsel gilt das Video so automatisch wieder als nicht gestartet.
    const [startedSrc, setStartedSrc] = useState<string | null>(null);

    useEffect(() => {
        const video = videoRef?.current;
        const handlePlay = () => setStartedSrc(src);

        video?.addEventListener("play", handlePlay);

        return () => video?.removeEventListener("play", handlePlay);
    }, [videoRef, src]);

    const toggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    };

    return { isStarted: startedSrc === src, toggleVideo };
};
