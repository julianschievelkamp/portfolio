import {
    overlayBottomInset,
    overlayPositionStyles,
    queries,
    scrollOffsets,
} from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";
import Button from "elements/components/Button/Button";

export const StyledPopup = styled.dialog`
    /* Absolut statt fixed, siehe overlayPositionStyles. Im Top Layer bezieht
       sich die Position auf den Dokumentanfang */
    ${overlayPositionStyles(scrollOffsets.popup)}

    /* Der Dialog selbst füllt nur den sichtbaren Bereich, damit sich seine
       Inhalte (z. B. der Slider) weiterhin daran ausrichten */
    height: var(--100svh);
    margin: 0;
    border: none;
    outline: none;
    max-width: none;
    max-height: none;
    /* Verhindert den horizontalen Overflow durch den Slider */
    overflow: hidden;
    color: inherit;
    background-color: white;
    width: 100%;
    padding: 1rem;
    user-select: none;

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem;
        }
    }

    /* Verlängert den weißen Hintergrund bis hinter die Adressleiste. Als
       Schatten statt Kind-Element, da overflow den eigenen Schatten nicht
       abschneidet */
    box-shadow: 0 ${overlayBottomInset} 0 0 white;

    /* Der Backdrop ist fixed und bildschirmfüllend und würde in Safari
       ebenfalls die weiße Fläche hinter der Adressleiste auslösen */
    &::backdrop {
        display: none;
    }

    /* Ein-/Ausblenden über data-visible; das Schließen erfolgt per JS nach der Transition */
    opacity: 0;
    transition: opacity ${transition.defaultIn};

    &[data-visible="true"] {
        opacity: 1;
        transition: opacity ${transition.default};
    }
`;

export const CloseButton = styled(Button)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 9;
    background: white;
    width: 2rem;
    height: 2rem;
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
    z-index: 1;

    @media ${queries.landscapeLgMax} {
        margin-bottom: 0rem;
        width: auto;
    }
`;
