import { css, styled } from "styled-components";
import { queries, transition } from "styles/variables";
import { PINCHING_ATTRIBUTE } from "styles/global";

const variables = css`
    /* Close und Slider bekommen zusätzlichen Abstand */
    --space-close: calc(4rem + 1rem);
    --space-slider: calc(5rem + 1rem);
    --space-caption: 3rem;
    --space-total: calc(
        var(--space-close) + var(--space-slider) + var(--space-caption)
    );

    --border-width: clamp(8px, 1.25vw, 12px);

    @media ${queries.landscape} {
        --border-width: clamp(8px, 1.25vh, 12px);
    }

    --border-total: calc(var(--border-width) * 2);
`;

export const StyledActiveItem = styled.div`
    ${variables}

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1rem 1rem var(--space-slider) 1rem;

    @media ${queries.landscapeLgMax} {
        width: auto;
        padding: 1rem;
    }

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem var(--space-slider) 8rem;
        }
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

    /* Pseudo-Element, da Safari sonst beim Pinch Zoom die Adressleisten schwarz färbt */
    &::before {
        content: "";
        inset: 0;
        position: absolute;
        background-color: black;
    }
`;

export const Artwork = styled.div`
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
        object-fit: cover;
        min-width: 10rem;
        min-height: 10rem;
        max-height: calc(100dvh - var(--border-total) - var(--space-total));

        @media ${queries.landscapeLgMax} {
            max-height: calc(100dvh - var(--border-total) - 2rem);
            max-width: calc(100vw - var(--border-total) - var(--space-total));
        }
    }

    > video {
        position: absolute;
        inset: 0;
    }
`;
