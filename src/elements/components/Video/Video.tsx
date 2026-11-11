import { StyledVideo } from "./Video.styles";

export interface VideoProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    src: string;
    poster: string;
    width?: string;
    height?: string;
    muted?: boolean;
    ariaLabel?: string;
    onClick?: () => void;
}

const Video = ({
    videoRef,
    src,
    poster,
    width,
    height,
    muted,
    ariaLabel,
    onClick,
}: VideoProps) => {
    return (
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
            onClick={onClick}
            aria-label={ariaLabel}
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </StyledVideo>
    );
};

export default Video;
