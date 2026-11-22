import { styled } from "styled-components";

import { queries, visuallyHidden } from "styles/variables";

export const ArtistWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    @media ${queries.lg} {
        grid-template-columns: 1fr 2fr;
    }
`;

export const PortraitFigure = styled.figure`
    display: flex;
    justify-content: center;
    margin: 0 0 2rem;
    height: fit-content;

    img {
        max-height: 30rem;
        border: 8px solid black;
    }

    @media ${queries.lg} {
        margin: 0 2rem 0 0;
    }
`;

export const PortraitCaption = styled.figcaption`
    ${visuallyHidden}
`;
