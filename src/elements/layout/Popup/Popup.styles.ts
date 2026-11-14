/// <reference types="vite/client" />
import close from "assets/icons/close.svg?raw";

import { createIconCursor } from "styles/createIconCursor";
import { colors, queries } from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledPopup = styled.dialog`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    height: 100dvh;
    width: 100%;
    background-color: transparent;
    padding: 1rem;

    margin: 0;
    overflow: clip;
    border: none;
    outline: none;
    max-width: none;
    max-height: none;
    color: inherit;
    user-select: none;

    opacity: 0;
    transition: opacity ${transition.defaultIn};

    &[data-visible="true"] {
        opacity: 1;
        transition: opacity ${transition.default};
    }

    &::backdrop {
        display: none;
    }

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem;
        }
    }
`;

export const Background = styled.div`
    position: absolute;
    inset: 0;
    z-index: 99;
    pointer-events: none;

    background-color: white;
    opacity: 0;
    transition:
        opacity ${transition.defaultIn},
        background-color ${transition.default};

    html:has([data-visible="true"]) & {
        opacity: 1;
        transition:
            opacity ${transition.default},
            background-color ${transition.default};
    }

    html:has([data-pinching]) & {
        background-color: black;
    }
`;

export const Backdrop = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    cursor: ${createIconCursor(close, { size: 32, color: colors.secondary })};
`;
