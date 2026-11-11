import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledItemButtons = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    right: 0;
    bottom: 0.5rem;
    transform: translateY(100%);

    will-change: opacity;
    transition: opacity ${transition.default};

    html:has([data-pinching]) & {
        opacity: 0;
    }

    @media ${queries.landscapeLgMax} {
        height: 100%;
        flex-direction: column;
        transform: translateX(100%);
        bottom: 0;
        right: 0.5rem;
    }
`;

export const Notch = styled.div`
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: black;

    &::before {
        content: "";
        position: absolute;
        background: black;
        transform: rotate(45deg);
        z-index: -1;
        left: -1.25rem;
        top: -2rem;
        width: 4rem;
        height: 4rem;
    }

    @media ${queries.landscapeLgMax} {
        height: auto;
        width: fit-content;
        flex-direction: column;

        &::before {
            left: -3rem;
        }
    }
`;
