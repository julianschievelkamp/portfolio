import { styled } from "styled-components";
import { transition, colors } from "styles/variables";

export const StyledIcon = styled.div<{
    $size?: string;
    $margin?: string;
    $padding?: string;
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
        fill: ${({ color }) => color ?? colors.secondary};
        width: ${({ $size }) => $size};
        height: ${({ $size }) => $size};
    }
`;
