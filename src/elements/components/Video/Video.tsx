import { useVideoPlayback } from "hooks/useVideoPlayback";
import Icon from "../Icon/Icon";
import { PlayButton, StyledVideo } from "./Video.styles";
import { RefObject } from "react";

export interface VideoProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    src: string;
    width: string;
    height: string;
    ariaLabel: string;
    audio?: string;
}

const Video = ({
    videoRef,
    src,
    width,
    height,
    ariaLabel,
    audio,
}: VideoProps) => {
    const { toggleVideo, hasStarted, isPaused } = useVideoPlayback(
        videoRef,
        audio,
    );

    return (
        <>
            <StyledVideo
                ref={videoRef}
                $width={width}
                $height={height}
                $isVisible={hasStarted}
                onContextMenu={(e) => e.preventDefault()}
                onClick={toggleVideo}
                aria-label={ariaLabel}
                preload="metadata"
                playsInline
                muted
                loop
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>

            <PlayButton
                onClick={toggleVideo}
                ariaLabel={`${isPaused ? "Play" : "Pause"} ${ariaLabel}`}
                $isVisible={!hasStarted}
            >
                <Icon
                    name={isPaused ? "play" : "pause"}
                    color="white"
                    size="3rem"
                    padding="0.5rem"
                />
            </PlayButton>
        </>
    );
};

export default Video;
