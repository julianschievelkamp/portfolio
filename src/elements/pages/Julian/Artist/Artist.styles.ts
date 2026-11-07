import { styled } from "styled-components";
import { queries } from "styles/variables";

export const ArtistWrapper = styled.div`
    display: flex;
    flex-direction: column;

    @media ${queries.lg} {
        flex-direction: row;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    height: fit-content;

    img {
        max-height: 30rem;
        border: 0.5rem solid black;
    }

    @media ${queries.lg} {
        margin-bottom: 0;
        margin-right: 2rem;
        min-width: 30%;
    }
`;
