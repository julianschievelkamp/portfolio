import { styled } from "styled-components";
import { queries, safeArea } from "styles/variables";

export const Main = styled.main`
    padding-top: 7.5rem;
    padding-right: ${safeArea.right};
    padding-left: ${safeArea.left};

    @media ${queries.md} {
        padding-top: 0;
        padding-left: calc(17rem + ${safeArea.left});
    }
`;
