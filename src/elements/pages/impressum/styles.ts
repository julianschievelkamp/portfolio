import styled from "styled-components";
import { queries } from "styles/variables";

export const StyledImpressum = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding: 1rem;

    @media ${queries.md} {
        padding: 4rem;
    }
`;
