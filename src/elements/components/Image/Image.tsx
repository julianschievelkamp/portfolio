import { useCallback, useState } from "react";
import { Fader, StyledImage } from "./Image.styles";

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
    const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

    const imageRef = useCallback(
        (image: HTMLImageElement | null) => {
            if (!image) return;

            const markLoaded = () => setLoadedSrc(src);

            if (image.complete) {
                markLoaded();
                return;
            }

            image.addEventListener("load", markLoaded, { once: true });

            return () => image.removeEventListener("load", markLoaded);
        },
        [src],
    );

    return (
        <>
            <StyledImage
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                alt={alt}
                $width={width}
                $height={height}
                $margin={margin}
                onLoad={() => {
                    setLoadedSrc(src);
                    onLoad?.();
                }}
                onError={onError}
                loading={loading}
                $aspectRatio={aspectRatio}
                ref={imageRef}
            />

            {fadeInOnLoad && <Fader $imageLoaded={loadedSrc === src} />}
        </>
    );
};

export default Image;
