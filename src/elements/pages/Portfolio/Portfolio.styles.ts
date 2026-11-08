import Button from "elements/components/Button/Button";
import { styled } from "styled-components";
import { queries, visuallyHidden } from "styles/variables";

export const PortfolioGrid = styled.ul`
    position: relative;
    display: grid;
    margin: 0;
    list-style: none;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.25rem;
    padding: 0.5rem;

    @media ${queries.lg} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0.5rem;
        padding: 1rem;
    }
`;

export const PortfolioListItem = styled.li`
    min-width: 5rem;
    min-height: 5rem;
    height: calc((100vw - 1.5rem) / 3);
    width: 100%;

    @media ${queries.md} {
        height: calc((100vw - 1.5rem - 17rem) / 3);
    }

    @media ${queries.lg} {
        height: calc((100vw - 3.5rem - 17rem) / 4);
    }
`;

export const PortfolioFigure = styled.figure`
    position: relative;
    margin: 0;
    height: 100%;
    width: 100%;
`;

export const PortfolioItem = styled(Button)`
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.05);

    &:hover,
    &:focus-visible {
        img {
            transform: scale(1.05);
        }
    }
`;

// Bildunterschrift nur für Screenreader und Suchmaschinen, optisch ausgeblendet
export const PortfolioCaption = styled.figcaption`
    ${visuallyHidden}
`;
