import styled from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledSidebar = styled.div<{ $isOpen: boolean }>`
    background: blue;
    width: 20rem;
    // TODO: platzhalter "5rem" für toggle sidebar button
    max-width: calc(100vw - 5rem);
    height: 100vh;
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    transform: ${({ $isOpen }) => `translateX(${$isOpen ? 0 : "-100%"})`};
    transition: ${transition.fast};
    overflow: hidden;

    @media ${queries.md} {
        padding: 2rem;
        transform: translateX(0);
    }
`;
