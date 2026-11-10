import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledImage = styled.img<{
    $imageLoaded: boolean;
    $fadeInOnLoad?: boolean;
    $width?: string;
    $height?: string;
    $margin?: string;
    $aspectRatio?: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    opacity: ${({ $imageLoaded }) => ($imageLoaded ? 1 : 0)};
    /* Hält den Compositing-Layer dauerhaft, damit iOS Safari ihn nicht nur für die
       Einblend-Transition anlegt und danach wieder entfernt. Dieser Wechsel lässt
       Bilder hinter der transparenten Browser-Leiste kurz aufblitzen. */
    will-change: ${({ $fadeInOnLoad }) =>
        $fadeInOnLoad ? "opacity, transform" : "auto"};
    margin: ${({ $margin }) => $margin};
    aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
    max-width: 100%;
    transition:
        opacity ${transition.default},
        transform ${transition.default};
    pointer-events: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;
