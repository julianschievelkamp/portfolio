import { useVideoPlayback } from "hooks/useVideoPlayback";
import Icon from "../Icon/Icon";
import { PlayButton, StyledVideo } from "./Video.styles";
import { RefObject } from "react";

export interface VideoProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    src: string;
    poster: string;
    width: string;
    height: string;
    ariaLabel: string;
    audio?: string;
}

const Video = ({
    videoRef,
    src,
    poster,
    width,
    height,
    ariaLabel,
    audio,
}: VideoProps) => {
    const { toggleVideo, hasStarted } = useVideoPlayback(videoRef, audio);

    return (
        <>
            <StyledVideo
                ref={videoRef}
                poster={poster}
                $width={width}
                $height={height}
                aria-label={ariaLabel}
                onContextMenu={(e) => e.preventDefault()}
                onClick={() => toggleVideo()}
                preload="none"
                playsInline
                muted
                loop
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>

            <PlayButton
                onClick={() => toggleVideo()}
                $isVisible={!hasStarted}
                ariaLabel={`Play ${ariaLabel}`}
            >
                <Icon name="play" color="white" size="3rem" padding="0.5rem" />
            </PlayButton>
        </>
    );
};

export default Video;
