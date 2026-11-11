import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledItemButtons = styled.div`
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    left: 0;
    bottom: 4rem;

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;
