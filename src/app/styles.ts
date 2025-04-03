import { Theme } from "data/types";
import styled from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledApp = styled.div<{ theme: Theme }>`
    width: 100vw;
    overflow: hidden;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: ${transition.fast};
    position: relative;
`;

export const PageContainer = styled.div`
    width: 100%;
    padding-top: 7.5rem;

    @media ${queries.md} {
        padding-left: 20rem;
        padding-top: unset;
    }
`;
