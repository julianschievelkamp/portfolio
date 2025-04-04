import { Theme } from "data/types";
import styled from "styled-components";
import { queries, scrollStyles, transition } from "styles/variables";

export const StyledSidebar = styled.div<{ $isOpen: boolean; theme: Theme }>`
    background: ${({ theme }) => theme.body};
    // background: blue;
    width: 17rem;
    // TODO: platzhalter "5rem" für toggle sidebar button
    max-width: calc(100vw - 5rem);
    height: 100%;
    position: fixed;
    padding: 1rem;
    top: 0;
    left: 0;
    transform: ${({ $isOpen }) => `translateX(${$isOpen ? 0 : "-100%"})`};
    transition: ${transition.fast};
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media ${queries.md} {
        padding: 2rem;
        transform: translateX(0);
    }
`;

export const ScrollContainer = styled.div`
    ${scrollStyles}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;
