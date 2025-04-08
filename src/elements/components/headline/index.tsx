import React from "react";

import { H1, H2 } from "./styles";

const headlines = {
    h1: H1,
    h2: H2,
};

export interface HeadlineProps {
    children?: React.ReactNode;
    className?: string;
    color?: string;
    textAlign?: "left" | "center" | "right" | "justify";
    margin?: string;
    fontSize?: string;
    lineHeight?: string;
    type?: "h1" | "h2";
}

const Headline = ({
    children,
    className,
    color,
    textAlign,
    margin = "0",
    fontSize = "1rem",
    lineHeight = "1.5",
    type = "h1",
    ...rest
}: HeadlineProps) => {
    const HeadlineComponent = headlines[type];

    return (
        <HeadlineComponent
            className={className}
            color={color}
            $textAlign={textAlign}
            $margin={margin}
            $fontSize={fontSize}
            $lineHeight={lineHeight}
            {...rest}
        >
            {children}
        </HeadlineComponent>
    );
};

export default Headline;
