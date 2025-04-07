import { Theme } from "data/types";
import styled from "styled-components";
import { queries } from "styles/variables";

export const StyledAbout = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding: 1rem;

    @media ${queries.md} {
        padding: 4rem;
    }
`;

export const ArtistWrapper = styled.div`
    display: flex;
    flex-direction: column;

    @media ${queries.md} {
        flex-direction: row;
    }
`;

export const ImageWrapper = styled.div<{ theme: Theme }>`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    height: fit-content;

    img {
        max-height: 30rem;
        border: ${({ theme }) => `8px solid ${theme.border}`};
    }

    @media ${queries.md} {
        margin-bottom: 0;
        margin-right: 2rem;
        min-width: 30%;
    }
`;
