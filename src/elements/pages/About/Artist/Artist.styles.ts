import { styled } from "styled-components";

import { queries, visuallyHidden } from "styles/variables";

export const ArtistWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media ${queries.xl} {
        flex-direction: row;
        align-items: flex-start;
    }
`;

export const PortraitFigure = styled.figure`
    position: relative;
    margin: 0;
    flex-shrink: 0;

    img {
        max-height: 30rem;
        border: 8px solid black;
    }
`;

export const PortraitCaption = styled.figcaption`
    ${visuallyHidden}
`;

export const TextWrapper = styled.div`
    min-width: 0;
    max-width: 100%;
`;
