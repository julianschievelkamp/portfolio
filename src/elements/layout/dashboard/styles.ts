import styled from "styled-components";
import { queries } from "styles/variables";

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
    background: red;
    height: calc((100vw - 3rem) / 3);
    width: 100%;

    @media ${queries.md} {
        height: calc((100vw - 3.5rem - 20rem) / 4);
    }
`;
