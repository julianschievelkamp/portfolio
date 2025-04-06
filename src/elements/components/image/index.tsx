import { useState } from "react";
import { StyledImage } from "./styles";

export interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    className?: string;
}

const Image = ({ src, alt, width, height, className }: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <StyledImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            $imageLoaded={imageLoaded}
            onLoad={() => setImageLoaded(true)}
            className={className}
            loading="lazy"
        />
    );
};

export default Image;
