import { styled } from "styled-components";

import { queries } from "styles/variables";

// Query container so the grid can derive its row height from its own width
export const PortfolioSection = styled.section`
    container-type: inline-size;
`;

/* Rows are sized explicitly (same size as the columns) instead of via aspect-ratio,
   because Safari keeps stale row heights for aspect-ratio grid items on resize */
export const PortfolioGrid = styled.div`
    --columns: 3;
    --gap: 0.25rem;
    --padding: 0.5rem;
    --min-tile-size: 5rem;

    position: relative;
    display: grid;
    margin: 0;
    grid-template-columns: repeat(
        var(--columns),
        minmax(var(--min-tile-size), 1fr)
    );
    grid-auto-rows: max(
        var(--min-tile-size),
        calc(
            (100cqi - 2 * var(--padding) - (var(--columns) - 1) * var(--gap)) /
                var(--columns)
        )
    );
    gap: var(--gap);
    padding: var(--padding);

    @media ${queries.lg} {
        --columns: 4;
        --gap: 0.5rem;
        --padding: 1rem;
    }
`;
