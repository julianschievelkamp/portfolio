import { css, styled } from "styled-components";
import { colors, transition } from "styles/variables";

export const StyledButton = styled.button`
    padding: 0;
    background: transparent;
    border: none;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

    ${({ disabled }) =>
        !disabled &&
        css`
            &:hover {
                svg {
                    fill: ${colors.primary};
                    transition: ${transition.fastest};
                }
            }
        `}
`;
