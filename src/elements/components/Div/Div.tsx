import React from "react";

import { StyledDiv } from "./Div.styles";

export interface DivProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    minHeight?: string;
    onClick?: () => void;
    className?: string;
    position?: string;
    display?: string;
    alignItems?: string;
    margin?: string;
    zIndex?: number;
}

const Div = ({
    children,
    width,
    height,
    minHeight,
    onClick,
    className,
    position,
    display,
    alignItems,
    margin,
    zIndex,
}: DivProps) => {
    return (
        <StyledDiv
            width={width}
            height={height}
            onClick={onClick}
            className={className}
            $minHeight={minHeight}
            $position={position}
            $display={display}
            $alignItems={alignItems}
            $margin={margin}
            $zIndex={zIndex}
        >
            {children}
        </StyledDiv>
    );
};

export default Div;
