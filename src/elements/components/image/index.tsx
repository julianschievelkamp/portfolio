import { useState } from "react";
import { StyledImage } from "./styles";

export interface ImageProps {
    src: string;
    srcSet?: string;
    sizes?: string;
    alt: string;
    width?: string;
    height?: string;
    fadeInOnLoad?: boolean;
    className?: string;
}

const Image = ({
    src,
    srcSet,
    sizes,
    alt,
    width,
    height,
    fadeInOnLoad,
    className,
}: ImageProps) => {
    // DEBUG
    const [imageLoaded, setImageLoaded] = useState(true);

    return (
        <StyledImage
            src={src}
            srcSet={srcSet}
            sizes={sizes}
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
