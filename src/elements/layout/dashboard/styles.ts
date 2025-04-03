import styled from "styled-components";
import { queries, transition } from "styles/variables";

export const StyledDashboard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 0.5rem;
    padding: 1rem;

    @media ${queries.md} {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

export const DashboardItem = styled.div`
    overflow: hidden;
    position: relative;
    height: calc((100vw - 3rem) / 3);
    width: 100%;

    @media ${queries.md} {
        height: calc((100vw - 3.5rem - 15rem) / 4);
    }

    img {
        transition: ${transition.fast};
    }

    &:hover {
        img {
            transform: scale(1.125);
        }
    }
`;
