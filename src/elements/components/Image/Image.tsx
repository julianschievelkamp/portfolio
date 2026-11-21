import { useImageFadeIn } from "hooks/useImageFadeIn";

import { StyledImage } from "./Image.styles";

interface ImageProps {
    alt: string;
    aspectRatio?: string;
    fadeInOnLoad?: boolean;
    fetchPriority?: "high" | "low" | "auto";
    height?: string;
    loading?: "lazy" | "eager";
    margin?: string;
    sizes?: string;
    src: string;
    srcSet?: string;
    width?: string;
    onError?: () => void;
    onLoad?: () => void;
}

const Image = ({
    alt,
    aspectRatio,
    fadeInOnLoad,
    fetchPriority,
    height,
    loading = "eager",
    margin,
    sizes,
    src,
    srcSet,
    width,
    onError,
    onLoad,
}: ImageProps) => {
    const { imageRef, isLoaded, markLoaded } = useImageFadeIn(src);

    return (
        <StyledImage
            ref={imageRef}
            alt={alt}
            $aspectRatio={aspectRatio}
            $fadeInOnLoad={fadeInOnLoad}
            fetchPriority={fetchPriority}
            $height={height}
            $isLoaded={isLoaded}
            loading={loading}
            $margin={margin}
            sizes={sizes}
            src={src}
            srcSet={srcSet}
            $width={width}
            onError={onError}
            onLoad={() => {
                markLoaded();
                onLoad?.();
            }}
        />
    );
};

export default Image;
