/// <reference types="vite/client" />
import chevronLeft from "assets/icons/chevron-left.svg?raw";
import chevronRight from "assets/icons/chevron-right.svg?raw";

import Text from "elements/components/Text/Text";
import { styled } from "styled-components";
import { queries, transition, colors } from "styles/variables";
import { createIconCursor } from "utils/createIconCursor";
import { PINCHING_ATTRIBUTE } from "styles/global";

export const StyledActiveItem = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5rem;
    width: 100%;
    height: 100%;

    @media ${queries.landscapeLgMax} {
        padding-bottom: 0;
        width: auto;
    }
`;

export const ItemFigure = styled.figure<{ $isItemRevealed: boolean }>`
    position: relative;
    z-index: 99;
    margin: 0;

    opacity: ${({ $isItemRevealed }) => ($isItemRevealed ? 1 : 0)};
    visibility: ${({ $isItemRevealed }) =>
        $isItemRevealed ? "visible" : "hidden"};
    transition:
        opacity ${transition.default},
        visibility ${transition.default};

    &::before {
        content: "";
        inset: 0;
        position: absolute;
        background-color: black;
    }
`;

export const Previous = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    left: 0;
    transform: translateX(-100%);

    cursor: ${createIconCursor(chevronLeft, {
        size: 48,
        color: colors.secondary,
    })};

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;

export const Next = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    right: 0;
    transform: translateX(100%);

    cursor: ${createIconCursor(chevronRight, {
        size: 48,
        color: colors.secondary,
    })};

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;

export const Artwork = styled.div`
    --border-width: clamp(8px, 1.25svw, 12px);

    @media ${queries.landscape} {
        --border-width: clamp(8px, 1.25svh, 12px);
    }

    border: var(--border-width) solid transparent;
    position: relative;
    display: flex;
    overflow: clip;
    margin: 0;

    /* Transformation aus usePinchZoom, ohne Geste gleitet das Werk zurück */
    transform-origin: 0 0;
    transform: var(--pinch-transform, none);
    transition: transform ${transition.default};
    /* Während der Geste folgt das Werk den Fingern ohne Verzögerung */
    html[${PINCHING_ATTRIBUTE}] & {
        transition: none;
    }

    > img,
    > video {
        --border-total: calc(var(--border-width) * 2);

        object-fit: cover;
        min-width: 10rem;
        min-height: 10rem;
        max-height: calc(100svh - 13rem - var(--border-total));

        @media ${queries.landscapeLgMax} {
            max-height: calc(100dvh - 2rem - var(--border-total));
            max-width: calc(100vw - 10rem - var(--border-total));
        }
    }

    > video {
        position: absolute;
        inset: 0;
    }
`;

export const ItemCaption = styled.figcaption`
    position: absolute;
    right: 0;
    top: 100%;
    padding-top: 0.25rem;
    z-index: -1;

    > p {
        white-space: nowrap;
        text-align: right;
    }

    @media ${queries.landscapeLgMax} {
        top: 100%;
        left: 100%;
        right: auto;
        width: max-content;
        transform-origin: top left;
        transform: rotate(-90deg);

        > p {
            text-align: left;
        }
    }
`;

export const Title = styled(Text)`
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
`;
