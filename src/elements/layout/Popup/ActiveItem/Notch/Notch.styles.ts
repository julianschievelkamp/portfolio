import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

export const NotchWrapper = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    right: 0;
    bottom: 0.5rem;
    z-index: -1;
    transition: transform ${transition.default};
    transform: translateY(100%);

    html:has([data-pinching]) & {
        transform: translateY(0);
    }

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;

export const StyledNotch = styled.div`
    position: relative;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: black;
    padding-right: 0.25rem;
    height: 2rem;
    max-width: 100%;

    &::before {
        content: "";
        position: absolute;
        background: black;
        transform: rotate(45deg);
        z-index: -1;
        left: -0.75rem;
        top: -1.5rem;
        width: 4rem;
        height: 4rem;
    }
`;
