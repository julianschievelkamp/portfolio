import { useEffect, useState } from "react";
import { PlayButton, PlayIcon, StyledVideo } from "./styles";

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
    // Merkt sich, für welche Quelle das Video gestartet wurde.
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

    return (
        <>
            <StyledVideo
                key={src}
                ref={videoRef}
                poster={poster}
                width={width}
                height={height}
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
                {startedSrc !== src && (
                    <PlayIcon
                        name="play"
                        size="3.5rem"
                        padding="0.5rem"
                        color="white"
                    />
                )}
            </PlayButton>
        </>
    );
};

export default Video;
