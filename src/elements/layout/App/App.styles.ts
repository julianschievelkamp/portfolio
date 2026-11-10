import { styled } from "styled-components";
import { queries, scrollStyles } from "styles/variables";

export const Main = styled.main`
    ${scrollStyles}

    width: 100vw;
    height: var(--100svh);
    padding-top: 7.5rem;

    @media ${queries.md} {
        padding-left: 17rem;
        padding-top: unset;
    }
`;
