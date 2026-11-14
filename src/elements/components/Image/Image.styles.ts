import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledImage = styled.img<{
    $width?: string;
    $height?: string;
    $margin?: string;
    $aspectRatio?: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    margin: ${({ $margin }) => $margin};
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    max-width: 100%;
    pointer-events: none;
    user-select: none;
`;

export const Fader = styled.span<{
    $imageLoaded: boolean;
}>`
    opacity: ${({ $imageLoaded }) => ($imageLoaded ? 0 : 1)};
    transition: opacity ${transition.default};
    background-color: white;
    pointer-events: none;
    position: absolute;
    inset: 0;
`;
