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

    will-change: opacity, background-color, box-shadow;
    opacity: 0;
    transition:
        opacity ${transition.defaultIn},
        background-color ${transition.default},
        box-shadow ${transition.default};

    &[data-visible="true"] {
        opacity: 1;
        transition:
            opacity ${transition.default},
            background-color ${transition.default},
            box-shadow ${transition.default};
    }

    html:has([data-pinching]) & {
        background-color: black;
        box-shadow: 0 100vh 0 0 black;
        box-shadow: 0 100svh 0 0 black;
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
    inset: 0;
    z-index: 1;
    cursor: ${createIconCursor(close, { size: 32, color: colors.secondary })};
`;
