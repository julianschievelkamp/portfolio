import { styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledButton = styled.button`
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        svg {
            fill: ${colors.primary};
            transition: ${transition.fastest};
        }
    }
`;
