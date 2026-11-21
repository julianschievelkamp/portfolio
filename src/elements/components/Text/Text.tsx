import type { ReactNode } from "react";

import { StyledText } from "./Text.styles";

export interface TextProps {
    children?: ReactNode;
    bold?: boolean;
    color?: string;
    textAlign?: "left" | "center" | "right" | "justify";
    margin?: string;
    fontSize?: string;
    toUpperCase?: boolean;
    whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
    className?: string;
    id?: string;
}

const Text = ({
    children,
    bold,
    color,
    textAlign,
    margin = "0",
    fontSize = "0.875rem",
    toUpperCase = false,
    whiteSpace,
    className,
    id,
}: TextProps) => {
    return (
        <StyledText
            id={id}
            $color={color}
            $bold={bold}
            $textAlign={textAlign}
            $margin={margin}
            $fontSize={fontSize}
            $toUpperCase={toUpperCase}
            $whiteSpace={whiteSpace}
            className={className}
        >
            {children}
        </StyledText>
    );
};

export default Text;
