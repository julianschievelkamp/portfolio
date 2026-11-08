import { styled } from "styled-components";
import Divider from "elements/components/Divider/Divider";
import { queries, visuallyHidden } from "styles/variables";

export const ArtistSection = styled.section``;

// Überschrift nur für Screenreader und Suchmaschinen, optisch ausgeblendet
export const StyledDivider = styled(Divider)`
    ${visuallyHidden}
`;

export const ArtistWrapper = styled.div`
    display: flex;
    flex-direction: column;

    @media ${queries.lg} {
        flex-direction: row;
    }
`;

export const PortraitFigure = styled.figure`
    display: flex;
    justify-content: center;
    margin: 0 0 2rem;
    height: fit-content;

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
