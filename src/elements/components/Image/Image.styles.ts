import { styled } from "styled-components";

import { transition } from "styles/variables";

export const StyledImage = styled.img<{
    $aspectRatio?: string;
    $height?: string;
    $margin?: string;
    $width?: string;
}>`
    display: block;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    margin: ${({ $margin }) => $margin};
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    max-width: 100%;
    pointer-events: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

/*
 * Needs a relative positioned parent.
 * Fades via background-color instead of opacity to avoid a compositing layer per image.
 * The initial color can be overridden via --fader-color.
 */
export const Fader = styled.span<{ $isLoaded: boolean }>`
    background-color: ${({ $isLoaded }) =>
        $isLoaded ? "transparent" : "var(--fader-color, white)"};
    transition: background-color ${transition.default};
    pointer-events: none;
    position: absolute;
    inset: 0;
`;
