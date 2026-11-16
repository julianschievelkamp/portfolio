import Link from "elements/components/Link/Link";
import { styled } from "styled-components";
import { queries, transition } from "styles/variables";

export const BadgesWrapper = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;

    @media ${queries.sm} {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;

    img {
        transition: transform ${transition.default};
    }

    &:hover,
    &:focus-visible {
        img {
            transform: scale(1.05);
        }
    }
`;
