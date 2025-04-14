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
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <StyledImage
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            $imageLoaded={!fadeInOnLoad || imageLoaded}
            onLoad={(e: any) => {
                setImageLoaded(true);

                srcSet && console.log(e.target.currentSrc);
            }}
            className={className}
            loading="lazy"
        />
    );
};

export default Image;
