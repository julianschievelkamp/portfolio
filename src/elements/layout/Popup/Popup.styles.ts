import { absoluteOverlayStyles, queries } from "styles/variables";
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
    padding: 1rem;
    margin: 0;

    opacity: 0;
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
            padding: 1rem 8rem;
        }
    }
`;
