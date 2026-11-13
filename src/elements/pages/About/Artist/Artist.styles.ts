import { styled } from "styled-components";
import { queries, visuallyHidden } from "styles/variables";

export const ArtistWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${queries.lg} {
        flex-direction: row;
        align-items: flex-start;
    }
`;

export const PortraitFigure = styled.figure`
    display: flex;
    justify-content: center;
    margin: 0 0 2rem;
    height: fit-content;
    position: relative;

    img {
        max-height: 30rem;
        border: 0.5rem solid black;
    }

    @media ${queries.lg} {
        margin: 0 2rem 0 0;
        min-width: 30%;
    }
`;

// Bildunterschrift nur für Screenreader und Suchmaschinen, optisch ausgeblendet
export const PortraitCaption = styled.figcaption`
    ${visuallyHidden}
`;
