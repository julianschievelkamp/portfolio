import { useEffect, useRef } from "react";
import { StyledVideo } from "./styles";
import Div from "../div";
import { useStore } from "hooks/useStore";

export interface VideoProps {
    src: string;
    poster: string;
    width?: string;
    height?: string;
    ariaLabel?: string;
}

const Video = ({ src, poster, width, height, ariaLabel }: VideoProps) => {
    const { popupOpen } = useStore();
    const ref = useRef<any>(null);

    useEffect(() => {
        if (!popupOpen) {
            ref?.current?.pause();
        }
    }, [popupOpen]);

    return (
        <Div>
            <StyledVideo
                key={src}
                ref={ref}
                poster={poster}
                width={width}
                height={height}
                playsInline
                loop
                controls
                controlsList="nodownload noremoteplayback noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                aria-label={ariaLabel}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>
        </Div>
    );
};

export default Video;
