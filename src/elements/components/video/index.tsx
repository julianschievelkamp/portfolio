import { StyledVideo } from "./styles";

export interface VideoProps {
    src: string;
    poster: string;
    width?: string;
    height?: string;
    ariaLabel?: string;
    videoRef?: React.RefObject<HTMLVideoElement | null>;
}

const Video = ({
    src,
    poster,
    width,
    height,
    ariaLabel,
    videoRef,
}: VideoProps) => {
    return (
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
    );
};

export default Video;
