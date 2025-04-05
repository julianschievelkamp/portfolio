import { StyledImage } from "./styles";

export interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    className?: string;
}

const Image = ({ src, alt, width, height, className }: ImageProps) => {
    return (
        <StyledImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    );
};

export default Image;
