import { useEffect, useState } from "react";
import { PlayButton, PlayIcon, StyledVideo } from "./styles";

export interface VideoProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    src: string;
    poster: string;
    width?: string;
    height?: string;
    ariaLabel?: string;
}

const Video = ({
    videoRef,
    src,
    poster,
    width,
    height,
    ariaLabel,
}: VideoProps) => {
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        const handlePlay = () => setIsPaused(false);
        const handlePause = () => setIsPaused(true);

        videoRef?.current?.addEventListener("play", handlePlay);
        videoRef?.current?.addEventListener("pause", handlePause);

        return () => {
            videoRef?.current?.removeEventListener("play", handlePlay);
            videoRef?.current?.removeEventListener("pause", handlePause);
        };
    }, []);

    const toggleVideo = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    };

    return (
        <>
            <StyledVideo
                key={src}
                ref={videoRef}
                poster={poster}
                width={width}
                height={height}
                playsInline
                loop
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                aria-label={ariaLabel}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>

            <PlayButton onClick={() => toggleVideo()}>
                {isPaused && (
                    <PlayIcon
                        name="play"
                        size="4rem"
                        padding="0.5rem"
                        color="white"
                    />
                )}
            </PlayButton>
        </>
    );
};

export default Video;
