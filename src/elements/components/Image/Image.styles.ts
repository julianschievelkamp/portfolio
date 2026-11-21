import { css, keyframes, styled } from "styled-components";

import { transition } from "styles/variables";

// Animates from the invisible state to the regular opacity value (e.g. 0.5 in the slider)
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
`;

export const StyledImage = styled.img<{
    $aspectRatio?: string;
    $fadeInOnLoad?: boolean;
    $height?: string;
    $isLoaded: boolean;
    $margin?: string;
    $width?: string;
}>`
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

    /* Animation instead of transition, so transition rules of parents (e.g. hover zoom) do not override it */
    ${({ $fadeInOnLoad, $isLoaded }) => {
        if (!$fadeInOnLoad) return;

        return $isLoaded
            ? css`
                  animation: ${fadeIn} ${transition.default};
              `
            : // && raises the specificity above parent rules such as the slider opacity
              css`
                  && {
                      opacity: 0;
                  }
              `;
    }}
`;
