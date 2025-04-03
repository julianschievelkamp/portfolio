import { StyledImage } from "./styles";

export interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
}

const Image = ({ src, alt, width, height }: ImageProps) => {
    return <StyledImage src={src} alt={alt} width={width} height={height} />;
};

export default Image;
