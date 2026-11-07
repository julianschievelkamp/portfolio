import { useEffect, useRef, useState } from "react";
import { StyledImage } from "./styles";

export interface ImageProps {
    src: string;
    srcSet?: string;
    sizes?: string;
    alt: string;
    width?: string;
    height?: string;
    margin?: string;
    fadeInOnLoad?: boolean;
    onLoad?: () => void;
    onError?: () => void;
    loading?: "lazy" | "eager";
    aspectRatio?: string;
}

const Image = ({
    src,
    srcSet,
    sizes,
    alt,
    width,
    height,
    margin,
    fadeInOnLoad,
    onLoad,
    onError,
    loading = "eager",
    aspectRatio,
}: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!imageLoaded && imageRef?.current?.complete) {
            setImageLoaded(true);
        }
    }, [imageLoaded]);

    return (
        <StyledImage
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            $margin={margin}
            $imageLoaded={!fadeInOnLoad || imageLoaded}
            onLoad={() => {
                setImageLoaded(true);
                onLoad?.();
            }}
            onError={onError}
            loading={loading}
            $aspectRatio={aspectRatio}
            ref={imageRef}
        />
    );
};

export default Image;
