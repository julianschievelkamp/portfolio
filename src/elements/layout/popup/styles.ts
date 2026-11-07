import { queries } from "styles/variables";
import { styled } from "styled-components";
import { transition } from "styles/variables";
import Button from "elements/components/button";

export const StyledPopup = styled.dialog`
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    border: none;
    max-width: none;
    max-height: none;
    overflow: visible;
    color: inherit;
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 1rem;
    user-select: none;

    @media ${queries.md} {
        @media ${queries.portrait} {
            padding: 1rem 8rem;
        }
    }

    &::backdrop {
        background: transparent;
    }

    /* Ein-/Ausblenden: display und overlay müssen diskret mit animiert werden */
    opacity: 0;
    transition:
        opacity ${transition.fast},
        display ${transition.fast} allow-discrete,
        overlay ${transition.fast} allow-discrete;

    &[open] {
        opacity: 1;
    }

    @starting-style {
        &[open] {
            opacity: 0;
        }
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

export const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
    width: 100%;
    position: relative;
    z-index: 1;

    @media ${queries.landscapeLgMax} {
        margin-bottom: 0rem;
        width: auto;
    }
`;
