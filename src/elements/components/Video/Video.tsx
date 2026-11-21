import { useRef } from "react";

import Icon from "elements/components/Icon/Icon";
import { useVideoPlayback } from "hooks/useVideoPlayback";

import { PlayButton, StyledVideo } from "./Video.styles";

interface VideoProps {
    ariaLabel: string;
    audio?: string;
    height?: string;
    isActive: boolean;
    src: string;
    width?: string;
}

const Video = ({
    ariaLabel,
    audio,
    height,
    isActive,
    src,
    width,
}: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { hasStarted, isPaused, toggleVideo } = useVideoPlayback(
        videoRef,
        audio,
        isActive,
    );

    return (
        <>
            <StyledVideo
                ref={videoRef}
                aria-label={ariaLabel}
                $height={height}
                $isVisible={hasStarted}
                loop
                muted
                playsInline
                preload="metadata"
                $width={width}
                onClick={toggleVideo}
                onContextMenu={(e) => e.preventDefault()}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>

            <PlayButton
                aria-label={`${isPaused ? "Play" : "Pause"} ${ariaLabel}`}
                $isVisible={!hasStarted}
                onClick={toggleVideo}
            >
                <Icon
                    color="white"
                    name={isPaused ? "play" : "pause"}
                    padding="0.5rem"
                    size="3rem"
                />
            </PlayButton>
        </>
    );
};

export default Video;
