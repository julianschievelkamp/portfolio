import { css, keyframes, styled } from "styled-components";

import { transition } from "styles/variables";

// Animiert vom unsichtbaren Zustand zum regulären Opacity-Wert (z. B. 0.5 im Slider)
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

    /* Animation statt Transition, damit transition-Regeln der Eltern (z. B. Hover-Zoom) sie nicht überschreiben */
    ${({ $fadeInOnLoad, $isLoaded }) => {
        if (!$fadeInOnLoad) return;

        return $isLoaded
            ? css`
                  animation: ${fadeIn} ${transition.default};
              `
            : // && erhöht die Spezifität über Eltern-Regeln wie die Slider-Opacity
              css`
                  && {
                      opacity: 0;
                  }
              `;
    }}
`;
