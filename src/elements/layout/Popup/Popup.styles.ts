import { absoluteOverlayStyles, queries } from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";
import Button from "elements/components/Button/Button";

export const StyledPopup = styled.dialog`
    ${absoluteOverlayStyles}

    overflow: visible;
    border: none;
    outline: none;
    max-width: none;
    max-height: none;
    color: inherit;
    user-select: none;
    width: 100%;
    padding: 1rem;
    margin: 0;

    &::backdrop {
        display: none;
    }

    /* Ein-/Ausblenden über data-visible; das Schließen erfolgt per JS nach der Transition */
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

    /* Während das ActiveItem gezoomt wird (data-pinching aus usePinchZoom),
       färben sich Hintergrund und box-shadow schwarz */
    &:has([data-pinching]) {
        --overlay-color: black;
    }

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem;
        }
    }
`;

export const CloseButton = styled(Button)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    z-index: 1;
`;

export const OuterWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4.5rem;
    width: 100%;
    position: relative;

    @media ${queries.landscapeLgMax} {
        margin-bottom: 0rem;
        width: auto;
    }
`;
