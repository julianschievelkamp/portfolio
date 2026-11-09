import { styled } from "styled-components";
import { queries } from "styles/variables";

export const Main = styled.main`
    width: 100%;
    padding-top: 7.5rem;

    @media ${queries.md} {
        padding-left: 17rem;
        padding-top: unset;
    }
`;
