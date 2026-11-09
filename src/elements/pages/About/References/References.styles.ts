import { styled } from "styled-components";
import { colors, queries } from "styles/variables";

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
