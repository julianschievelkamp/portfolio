import { useRef } from "react";
import { StyledVideo } from "./styles";
import Div from "../div";

export interface VideoProps {
    src: string;
    poster: string;
    width?: string;
    height?: string;
}

const Video = ({ src, poster, width, height }: VideoProps) => {
    const ref = useRef<any>(null);

    return (
        <Div>
            <StyledVideo
                ref={ref}
                poster={poster}
                width={width}
                height={height}
                loop
                controls
                controlsList="nodownload noremoteplayback noplaybackrate"
                disablePictureInPicture
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>
        </Div>
    );
};

export default Video;
