import { styled } from "styled-components";

export const StyledDiv = styled.div<{
    width?: string;
    height?: string;
    onClick?: () => void;
    $minHeight?: string;
    $position?: string;
    $display?: string;
    $alignItems?: string;
    $margin?: string;
    $zIndex?: number;
}>`
    position: ${({ $position }) => $position ?? "relative"};
    display: ${({ $display }) => $display};
    align-items: ${({ $alignItems }) => $alignItems};
    margin: ${({ $margin }) => $margin};
    width: ${({ width }) => width};
    max-width: 100%;
    min-height: ${({ $minHeight }) => $minHeight};
    height: ${({ height }) => height};
    z-index: ${({ $zIndex }) => $zIndex};
`;
