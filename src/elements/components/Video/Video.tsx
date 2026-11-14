import { useVideoPlayback } from "hooks/useVideoPlayback";
import Icon from "../Icon/Icon";
import { PlayButton, StyledVideo } from "./Video.styles";

export interface VideoProps {
    src: string;
    poster: string;
    width?: string;
    height?: string;
    ariaLabel?: string;
}

const Video = ({ src, poster, width, height, ariaLabel }: VideoProps) => {
    const { videoRef, toggleVideo, isStarted } = useVideoPlayback();

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
                playsInline
                loop
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>

            <PlayButton
                onClick={() => toggleVideo()}
                $isVisible={!isStarted}
                ariaLabel="Play Video"
            >
                <Icon name="play" color="white" size="3rem" padding="0.5rem" />
            </PlayButton>
        </>
    );
};

export default Video;
