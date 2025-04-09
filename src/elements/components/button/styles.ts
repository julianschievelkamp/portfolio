import styled from "styled-components";
import { Theme, transition } from "styles/variables";

export const StyledButton = styled.button<{ theme: Theme }>`
    padding: 0;
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        svg {
            fill: ${({ theme }) => theme.hover};
            transition: ${transition.fastest};
        }
    }
`;
