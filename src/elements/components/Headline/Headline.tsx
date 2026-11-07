import React from "react";

import { H1, H2 } from "./Headline.styles";

const headlines = {
    h1: H1,
    h2: H2,
};

export interface HeadlineProps {
    children?: React.ReactNode;
    className?: string;
    color?: string;
    textAlign?: "left" | "center" | "right" | "justify";
    fontSize?: string;
    type?: "h1" | "h2";
}

const Headline = ({
    children,
    className,
    color,
    textAlign,
    fontSize = "1rem",
    type = "h1",
}: HeadlineProps) => {
    const HeadlineComponent = headlines[type];

    return (
        <HeadlineComponent
            className={className}
            color={color}
            $textAlign={textAlign}
            $fontSize={fontSize}
        >
            {children}
        </HeadlineComponent>
    );
};

export default Headline;
