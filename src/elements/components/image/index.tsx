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
    loading?: "lazy" | "eager";
    aspectRatio?: string;
    opacity?: number;
    className?: string;
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
    loading = "eager",
    aspectRatio,
    opacity = 1,
    className,
}: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);

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
            $margin={margin}
            $imageLoaded={!fadeInOnLoad || imageLoaded}
            onLoad={() => {
                setImageLoaded(true);
                onLoad?.();
            }}
            loading={loading}
            $aspectRatio={aspectRatio}
            $opacity={opacity}
            className={className}
            ref={imageRef}
        />
    );
};

export default Image;
