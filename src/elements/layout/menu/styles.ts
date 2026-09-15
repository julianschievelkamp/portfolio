import { styled } from "styled-components";
import { transition, queries } from "styles/variables";
import Headline from "elements/components/headline";

export const StyledMenu = styled.div<{ $isVisible: boolean }>`
    background-color: white;
    width: 100vw;
    position: fixed;
    height: 7.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    transform: ${({ $isVisible }) => `translateY(${$isVisible ? 0 : "-100%"})`};
    transition: ${transition.fast};
    z-index: 9;

    @media ${queries.md} {
        display: none;
    }
`;

export const StyledHeadline = styled(Headline)`
    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;
