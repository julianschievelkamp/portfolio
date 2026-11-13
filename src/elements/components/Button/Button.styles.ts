import { css, styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledButton = styled.button`
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    ${({ disabled }) =>
        !disabled &&
        css`
            &:hover,
            &:focus-visible {
                svg {
                    fill: ${colors.primary};
                    transition: fill ${transition.fast};
                }
            }
        `}
`;
