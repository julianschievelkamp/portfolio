import styled from "styled-components";
import { queries, Theme, transition } from "styles/variables";

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

    @media ${queries.lg} {
        flex-direction: row;
    }
`;

export const ImageWrapper = styled.div<{ theme: Theme }>`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    height: fit-content;

    img {
        max-height: 30rem;
        border: ${({ theme }) => `8px solid ${theme.text}`};
    }

    @media ${queries.lg} {
        margin-bottom: 0;
        margin-right: 2rem;
        min-width: 30%;
    }
`;

export const ReferencesWrapper = styled.div<{ theme: Theme }>`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;

    span {
        color: ${({ theme }) => theme.secondary};
        transition: ${transition.fast};
    }

    @media ${queries.sm} {
        grid-template-columns: 1fr 2fr;
    }

    @media ${queries.lg} {
        grid-template-columns: 1fr 2fr 1fr 2fr;
    }
`;

export const BadgesWrapper = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;

    @media ${queries.sm} {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;
