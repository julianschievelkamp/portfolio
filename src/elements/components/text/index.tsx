import React from "react";

import { StyledText } from "./styles";

export interface TextProps {
    children?: React.ReactNode;
    bold?: boolean;
    className?: string;
    color?: string;
    textAlign?: "left" | "center" | "right";
    margin?: string;
    fontSize?: string;
    lineHeight?: string;
}

const Text = ({
    children,
    bold,
    className,
    color,
    textAlign,
    margin = "0",
    fontSize = "1rem",
    lineHeight = "1.5",
    ...rest
}: TextProps) => {
    return (
        <StyledText
            className={className}
            color={color}
            $bold={bold}
            $textAlign={textAlign}
            $margin={margin}
            $fontSize={fontSize}
            $lineHeight={lineHeight}
            {...rest}
        >
            {children}
        </StyledText>
    );
};

export default Text;
