import { styled } from "styled-components";
import { queries, scrollStyles } from "styles/variables";

export const StyledApp = styled.div`
    width: 100vw;
    height: var(--100vh);
    overflow: hidden;
    background-color: white;
    color: black;
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
