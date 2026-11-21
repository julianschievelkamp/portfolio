import { useImageFadeIn } from "hooks/useImageFadeIn";
import { StyledImage } from "./Image.styles";

interface ImageProps {
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
    fetchPriority?: "high" | "low" | "auto";
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
    fetchPriority,
    aspectRatio,
}: ImageProps) => {
    const { imageRef, isLoaded, markLoaded } = useImageFadeIn(src);

    return (
        <StyledImage
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            $width={width}
            $height={height}
            $margin={margin}
            $fadeInOnLoad={fadeInOnLoad}
            $isLoaded={isLoaded}
            onLoad={() => {
                markLoaded();
                onLoad?.();
            }}
            onError={onError}
            loading={loading}
            fetchPriority={fetchPriority}
            $aspectRatio={aspectRatio}
            ref={imageRef}
        />
    );
};

export default Image;
