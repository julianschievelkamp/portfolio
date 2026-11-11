export const useVideoPlayback = (
    videoRef: React.RefObject<HTMLVideoElement | null>,
) => {
    const toggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    };

    return { toggleVideo };
};
