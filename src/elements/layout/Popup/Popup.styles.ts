/// <reference types="vite/client" />
import close from "assets/icons/close.svg?raw";

import { createIconCursor } from "styles/createIconCursor";
import {
    absoluteOverlayStyles,
    colors,
    queries,
    safeArea,
} from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledPopup = styled.dialog`
    ${absoluteOverlayStyles}

    overflow-y: visible;
    overflow-x: clip;
    border: none;
    outline: none;
    max-width: none;
    max-height: none;
    color: inherit;
    user-select: none;
    width: 100vw;
    padding: 1rem calc(1rem + ${safeArea.right}) 1rem
        calc(1rem + ${safeArea.left});
    margin: 0;

    opacity: 0;
    will-change: opacity, background-color, box-shadow;
    transition: opacity ${transition.defaultIn};

    &[data-visible="true"] {
        opacity: 1;
        transition:
            opacity ${transition.default},
            background-color ${transition.default},
            box-shadow ${transition.default};
    }

    /* Während das ActiveItem gezoomt wird (data-pinching aus usePinchZoom),
       färben sich Hintergrund und box-shadow schwarz */
    &:has([data-pinching]) {
        --overlay-color: black;
    }

    &::backdrop {
        display: none;
    }

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem calc(8rem + ${safeArea.right}) 1rem
                calc(8rem + ${safeArea.left});
        }
    }
`;

export const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    cursor: ${createIconCursor(close, { size: 32, color: colors.secondary })};
`;
