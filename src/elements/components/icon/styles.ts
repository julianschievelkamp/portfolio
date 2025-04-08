import { Theme } from "styles/variables";
import styled, { css } from "styled-components";

import { transition } from "styles/variables";

export const StyledIcon = styled.div<{
    $size?: string;
    $margin?: string;
    $padding?: string;
    theme?: Theme;
    onClick?: () => void | undefined;
}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    margin: ${({ $margin }) => $margin};
    padding: ${({ $padding }) => $padding};
    max-width: 100%;
    max-height: 100%;
    box-sizing: content-box;

    svg {
        transition: ${transition.fast};
        fill: ${({ theme, color }) => color ?? theme.secondary};
        width: ${({ $size }) => $size};
        height: ${({ $size }) => $size};
    }

    &:hover {
        svg {
            fill: ${({ theme }) => theme.hover};
            transition: ${transition.fastest};
        }
    }

    ${({ onClick }) =>
        onClick &&
        css`
            cursor: pointer;
        `}
`;
