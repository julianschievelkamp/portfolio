import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledButton = styled.button`
    padding: 0;
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        svg {
            fill: ${colors.yellow};
            transition: ${transition.fastest};
        }
    }
`;
