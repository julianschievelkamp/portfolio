import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

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

export const InnerWrapper = styled.div<{ $isItemRevealed: boolean }>`
    background-color: black;
    position: relative;
    z-index: 9;

    opacity: ${({ $isItemRevealed }) => ($isItemRevealed ? 1 : 0)};
    visibility: ${({ $isItemRevealed }) =>
        $isItemRevealed ? "visible" : "hidden"};
    transition:
        opacity ${transition.default},
        visibility ${transition.default};
    will-change: opacity;
`;

export const ItemFigure = styled.figure`
    position: relative;
    display: flex;
    overflow: hidden;
    border: 0.5rem solid transparent;
    margin: 0;
    z-index: 9;

    /* Transformation aus usePinchZoom, ohne Geste gleitet das Werk zurück */
    will-change: transform;
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
        min-width: 10rem;
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
