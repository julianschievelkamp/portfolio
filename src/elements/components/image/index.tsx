import { useEffect, useRef, useState } from "react";
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
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imageLoaded && imageRef?.current?.complete) {
            setImageLoaded(true);
        }
    }, []);

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
            ref={imageRef}
            loading="lazy"
        />
    );
};

export default Image;
