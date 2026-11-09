import { styled } from "styled-components";
import { queries } from "styles/variables";

export const PortfolioGrid = styled.div`
    position: relative;
    display: grid;
    margin: 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.25rem;
    padding: 0.5rem;

    @media ${queries.lg} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0.5rem;
        padding: 1rem;
    }
`;
