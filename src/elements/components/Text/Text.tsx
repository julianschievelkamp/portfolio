import React from "react";

import { StyledText } from "./Text.styles";

export interface TextProps {
    children?: React.ReactNode;
    bold?: boolean;
    color?: string;
    textAlign?: "left" | "center" | "right" | "justify";
    margin?: string;
    fontSize?: string;
    toUpperCase?: boolean;
    className?: string;
}

const Text = ({
    children,
    bold,
    color,
    textAlign,
    margin = "0",
    fontSize = "1rem",
    toUpperCase = false,
    className,
}: TextProps) => {
    return (
        <StyledText
            color={color}
            $bold={bold}
            $textAlign={textAlign}
            $margin={margin}
            $fontSize={fontSize}
            $toUpperCase={toUpperCase}
            className={className}
        >
            {children}
        </StyledText>
    );
};

export default Text;
