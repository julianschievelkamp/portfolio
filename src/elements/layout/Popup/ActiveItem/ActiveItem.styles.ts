import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledActiveItem = styled.div<{ $isItemRevealed: boolean }>`
    position: relative;
    z-index: 9;

    opacity: ${({ $isItemRevealed }) => ($isItemRevealed ? 1 : 0)};
    visibility: ${({ $isItemRevealed }) =>
        $isItemRevealed ? "visible" : "hidden"};
    transition: opacity ${transition.default};
`;

export const ItemFigure = styled.figure`
    position: relative;

    display: flex;
    overflow: hidden;
    border: 0.5rem solid black;
    margin: 0;
    z-index: 9;

    /* Transformation aus usePinchZoom, ohne Geste gleitet das Werk zurück */
    transform-origin: 0 0;
    transform: var(--pinch-transform, none);
    transition: transform ${transition.default};
    /* Während der Geste folgt das Werk den Fingern ohne Verzögerung */
    &[data-pinching] {
        transition: none;
    }

    > img,
    > video {
        object-fit: cover;
        min-height: 10rem;
        max-height: calc(100dvh - 14rem);

        @media ${queries.landscapeLgMax} {
            max-height: calc(100dvh - 3rem);
            max-width: calc(100vw - 11rem);
        }
    }

    > video {
        position: absolute;
        top: 0;
        left: 0;
    }
`;
