import { Theme } from "data/types";
import styled from "styled-components";
import { queries, transition } from "styles/variables";

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
    width: 100%;
    height: var(--100vh);
    padding-top: 7.5rem;
    overflow-y: scroll;

    @media ${queries.md} {
        padding-left: 15rem;
        padding-top: unset;
    }
`;
