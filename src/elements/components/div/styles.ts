import styled, { css } from "styled-components";

export const StyledDiv = styled.div<{
    width?: string;
    height?: string;
    onClick?: () => void;
    $maxWidth?: string;
    $position?: string;
    $display?: string;
    $flexDirection?: string;
    $justifyContent?: string;
    $flexWrap?: string;
    $alignItems?: string;
    $margin?: string;
    $padding?: string;
    $top?: string;
    $left?: string;
    $right?: string;
    $bottom?: string;
    $opacity?: number;
}>`
    position: ${({ $position }) => $position ?? "relative"};
    display: ${({ $display }) => $display};
    flex-direction: ${({ $flexDirection }) => $flexDirection};
    justify-content: ${({ $justifyContent }) => $justifyContent};
    flex-wrap: ${({ $flexWrap }) => $flexWrap};
    align-items: ${({ $alignItems }) => $alignItems};
    margin: ${({ $margin }) => $margin};
    padding: ${({ $padding }) => $padding};
    width: ${({ width }) => width};
    max-width: ${({ $maxWidth }) => $maxWidth ?? "100%"};
    height: ${({ height }) => height};
    top: ${({ $top }) => $top};
    left: ${({ $left }) => $left};
    right: ${({ $right }) => $right};
    bottom: ${({ $bottom }) => $bottom};
    opacity: ${({ $opacity }) => $opacity};

    ${({ onClick }) =>
        onClick &&
        css`
            cursor: pointer;
        `}
`;
