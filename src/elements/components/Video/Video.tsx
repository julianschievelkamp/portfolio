import { useVideoPlayback } from "hooks/useVideoPlayback";
import { PlayButton, PlayIcon, StyledVideo } from "./Video.styles";

export interface VideoProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    src: string;
    poster: string;
    width?: string;
    height?: string;
    muted?: boolean;
    ariaLabel?: string;
}

const Video = ({
    videoRef,
    src,
    poster,
    width,
    height,
    muted,
    ariaLabel,
}: VideoProps) => {
    const { isStarted, toggleVideo } = useVideoPlayback(videoRef, src);

    return (
        <>
            <StyledVideo
                key={src}
                ref={videoRef}
                poster={poster}
                $width={width}
                $height={height}
                muted={muted}
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
                <PlayIcon
                    name="play"
                    size="3.5rem"
                    padding="0.5rem"
                    color="white"
                    $isHidden={isStarted}
                />
            </PlayButton>
        </>
    );
};

export default Video;
