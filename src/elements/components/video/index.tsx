import { StyledVideo } from "./styles";
import Div from "../div";

export interface VideoProps {
    src: string;
    poster: string;
    width?: string;
    height?: string;
}

const Video = ({ src, poster, width, height }: VideoProps) => {
    return (
        <Div>
            <StyledVideo
                key={src}
                poster={poster}
                width={width}
                height={height}
                playsInline
                loop
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </StyledVideo>
        </Div>
    );
};

export default Video;
