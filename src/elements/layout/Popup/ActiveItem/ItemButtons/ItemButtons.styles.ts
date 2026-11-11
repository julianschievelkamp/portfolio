import { styled } from "styled-components";
import { queries } from "styles/variables";

export const StyledItemButtons = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    bottom: 4rem;
    width: 100%;

    @media ${queries.landscapeLgMax} {
        bottom: 0;
        flex-direction: column;
        width: unset;
        height: 100%;
    }
`;
