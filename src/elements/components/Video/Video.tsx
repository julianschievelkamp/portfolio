import { useVideoPlayback } from "hooks/useVideoPlayback";
import Icon from "../Icon/Icon";
import { PlayButton, StyledVideo } from "./Video.styles";
import { useRef } from "react";

export interface VideoProps {
    src: string;
    width?: string;
    height?: string;
    ariaLabel: string;
    audio?: string;
    isActive: boolean;
}

const Video = ({
    src,
    width,
    height,
    ariaLabel,
    audio,
    isActive,
}: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toggleVideo, hasStarted, isPaused } = useVideoPlayback(
        videoRef,
        audio,
        isActive,
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
                aria-label={`${isPaused ? "Play" : "Pause"} ${ariaLabel}`}
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
