import Button from "elements/components/button";
import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledPortfolio = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.25rem;
    padding: 0.5rem;

    @media ${queries.lg} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0.5rem;
        padding: 1rem;
    }
`;

export const PortfolioItem = styled(Button)`
    overflow: hidden;
    position: relative;
    min-width: 5rem;
    min-height: 5rem;
    height: calc((100vw - 1.5rem) / 3);
    width: 100%;
    background-color: rgb(0, 0, 0, 0.1);

    @media ${queries.md} {
        height: calc((100vw - 1.5rem - 17rem) / 3);
    }

    @media ${queries.lg} {
        height: calc((100vw - 3.5rem - 17rem) / 4);
    }

    &:hover {
        img {
            transform: scale(1.05);
        }
    }
`;
