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
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const handlePlay = () => setHasStarted(true);

        videoRef?.current?.addEventListener("play", handlePlay);

        return () => videoRef?.current?.removeEventListener("play", handlePlay);
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
                tabIndex={-1}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>

            <PlayButton onClick={() => toggleVideo()}>
                {!hasStarted && (
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
