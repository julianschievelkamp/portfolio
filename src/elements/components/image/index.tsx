import { useState } from "react";
import { StyledImage } from "./styles";

export interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    fadeInOnLoad?: boolean;
    className?: string;
}

const Image = ({
    src,
    alt,
    width,
    height,
    fadeInOnLoad,
    className,
}: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <StyledImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            $imageLoaded={!fadeInOnLoad || imageLoaded}
            onLoad={() => setImageLoaded(true)}
            className={className}
            loading="lazy"
        />
    );
};

export default Image;
