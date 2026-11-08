import Button from "elements/components/Button/Button";
import { styled } from "styled-components";
import { queries, visuallyHidden } from "styles/variables";

export const PortfolioSection = styled.section``;

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

export const PortfolioFigure = styled.figure`
    overflow: hidden;
    position: relative;
    margin: 0;
    min-width: 5rem;
    min-height: 5rem;
    height: calc((100vw - 1.5rem) / 3);
    width: 100%;
    background-color: rgb(0, 0, 0, 0.05);

    @media ${queries.md} {
        height: calc((100vw - 1.5rem - 17rem) / 3);
    }

    @media ${queries.lg} {
        height: calc((100vw - 3.5rem - 17rem) / 4);
    }
`;

// Das Bild liegt bewusst nicht im Button, damit Reader-Modi es erhalten.
export const PortfolioButton = styled(Button)`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;

    &:hover + img,
    &:focus-visible + img {
        transform: scale(1.05);
    }
`;

// Bildunterschrift nur für Screenreader und Suchmaschinen, optisch ausgeblendet
export const PortfolioCaption = styled.figcaption`
    ${visuallyHidden}
`;
