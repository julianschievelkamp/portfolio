import { styled } from "styled-components";
import { queries, Theme, transition } from "styles/variables";

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

export const PortfolioItem = styled.div<{ theme: Theme }>`
    overflow: hidden;
    position: relative;
    height: calc((100vw - 1.5rem) / 3);
    width: 100%;
    cursor: pointer;
    background-color: ${({ theme }) => theme.tertiary};
    transition: ${transition.fast};

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
