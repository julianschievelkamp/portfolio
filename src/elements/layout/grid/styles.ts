import styled from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.25rem;
    padding: 0.5rem;

    @media ${queries.md} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 0.5rem;
        padding: 1rem;
    }
`;

export const GridItem = styled.div`
    overflow: hidden;
    position: relative;
    height: calc((100vw - 1.5rem) / 3);
    width: 100%;

    @media ${queries.md} {
        height: calc((100vw - 3.5rem - 17rem) / 4);
    }

    img {
        transition: ${transition.fast};
    }

    &:hover {
        img {
            transform: scale(1.125);
        }
    }

    // disable drag drop and right click
    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }
`;
