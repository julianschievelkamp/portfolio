import { Theme } from "data/types";
import styled from "styled-components";
import { queries, scrollStyles, transition } from "styles/variables";

export const StyledApp = styled.div<{ theme: Theme }>`
    width: 100vw;
    height: var(--100vh);
    overflow: hidden;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: ${transition.fast};
    position: relative;
`;

export const PageContainer = styled.div`
    ${scrollStyles}

    width: 100%;
    height: var(--100vh);
    padding-top: 7.5rem;

    @media ${queries.md} {
        padding-left: 17rem;
        padding-top: unset;
    }
`;
