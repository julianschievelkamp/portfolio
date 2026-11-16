import React from "react";

import { H1, H2 } from "./Headline.styles";

const headlines = {
    h1: H1,
    h2: H2,
};

export interface HeadlineProps {
    type?: "h1" | "h2";
    children?: React.ReactNode;
    visuallyHidden?: boolean;
}

const Headline = ({ type = "h1", children, visuallyHidden }: HeadlineProps) => {
    const HeadlineComponent = headlines[type];

    return (
        <HeadlineComponent $visuallyHidden={visuallyHidden}>
            {children}
        </HeadlineComponent>
    );
};

export default Headline;
