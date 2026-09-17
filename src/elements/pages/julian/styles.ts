import Div from "elements/components/div";
import { styled } from "styled-components";
import { colors, queries, transition } from "styles/variables";

export const StyledJulian = styled.div`
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

export const StyledSocial = styled(Div)`
    &:hover {
        img {
            transform: scale(1.1);
        }

        a {
            color: ${colors.yellow};
            transition: ${transition.fastest};
        }
    }
`;

export const StyledProfile = styled.div`
    width: 3.5rem;
    min-width: 3.5rem;
    height: 3.5rem;
    min-height: 3.5rem;
    border-radius: 100px;
    border: 2px solid transparent;
    padding: 2px;
    background:
        linear-gradient(white 0 0) padding-box,
        linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)
            border-box;
`;

export const ProfileImage = styled.div`
    overflow: hidden;
    border-radius: 100px;
    width: 100%;
    height: 100%;
`;

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    height: fit-content;

    img {
        max-height: 30rem;
        border: 8px solid black;
    }

    @media ${queries.lg} {
        margin-bottom: 0;
        margin-right: 2rem;
        min-width: 30%;
    }
`;

export const ReferencesWrapper = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;

    span {
        color: ${colors.secondary};
    }

    @media ${queries.sm} {
        grid-template-columns: 1fr 2fr;
    }

    @media ${queries.lg} {
        grid-template-columns: 1fr 2fr 1fr 2fr;
    }
`;

export const ListWrapper = styled.div`
    padding: 0 0 0 1rem;

    @media ${queries.sm} {
        padding: 0;
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
