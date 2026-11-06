import { styled } from "styled-components";
import { queries } from "styles/variables";

export const BadgesWrapper = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;

    @media ${queries.sm} {
        grid-template-columns: 1fr 1fr 1fr;
    }

    a {
        display: flex;
        align-items: center;
    }
`;
