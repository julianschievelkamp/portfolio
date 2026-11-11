import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

export const ItemFigure = styled.figure<{ $isItemRevealed: boolean }>`
    margin: 0;
    position: relative;
    display: flex;
    border: 0.5rem solid black;
    overflow: hidden;

    z-index: 9;
    max-width: 100%;
    opacity: ${({ $isItemRevealed }) => ($isItemRevealed ? 1 : 0)};
    visibility: ${({ $isItemRevealed }) =>
        $isItemRevealed ? "visible" : "hidden"};
    /* Transformation aus usePinchZoom, ohne Geste gleitet das Werk zurück */
    transform: var(--pinch-transform, none);
    transform-origin: 0 0;
    transition:
        transform ${transition.default},
        opacity ${transition.default};

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
