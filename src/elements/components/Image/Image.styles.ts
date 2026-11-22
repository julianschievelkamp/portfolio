import { css, keyframes, styled } from "styled-components";

import { transition } from "styles/variables";

const fadeIn = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`;

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

/* Needs a relative positioned parent */
export const Fader = styled.span<{ $isLoaded: boolean }>`
    background-color: white;
    pointer-events: none;
    position: absolute;
    inset: 0;

    ${({ $isLoaded }) =>
        $isLoaded &&
        css`
            animation: ${fadeIn} ${transition.default} forwards;
        `}
`;
