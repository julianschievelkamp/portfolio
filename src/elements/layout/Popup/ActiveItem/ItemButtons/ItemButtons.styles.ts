import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledItemButtons = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
    z-index: -1;

    @media ${queries.landscapeLgMax} {
        display: none;
    }
`;
