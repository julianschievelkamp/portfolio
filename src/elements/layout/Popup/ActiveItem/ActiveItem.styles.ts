import { styled } from "styled-components";
import { queries, transition } from "styles/variables";
import Text from "elements/components/Text/Text";

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
    background-color: black;
    position: relative;
    z-index: 99;
    margin: 0;

    opacity: ${({ $isItemRevealed }) => ($isItemRevealed ? 1 : 0)};
    visibility: ${({ $isItemRevealed }) =>
        $isItemRevealed ? "visible" : "hidden"};
    transition:
        opacity ${transition.default},
        visibility ${transition.default};
    will-change: opacity;
`;

export const Artwork = styled.div`
    position: relative;
    display: flex;
    overflow: hidden;
    border: 0.5rem solid transparent;
    margin: 0;

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

export const ItemCaption = styled.figcaption`
    transform: translate3d(0, 0, 0);
    position: absolute;
    right: 0;
    top: 100%;
    padding-top: 0.25rem;
    z-index: -1;

    @media ${queries.landscapeLgMax} {
        top: 100%;
        left: 100%;
        right: auto;
        width: max-content;
        transform-origin: top left;
        transform: rotate(-90deg) translate3d(0, 0, 0);

        > p {
            text-align: left;
        }
    }
`;

export const ItemTitle = styled(Text)`
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
`;
