import React from "react";

import { H1, H2, HeadlineWrapper, StyledHeadline } from "./Headline.styles";

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
        <StyledHeadline $visuallyHidden={visuallyHidden}>
            <HeadlineWrapper>
                <HeadlineComponent>{children}</HeadlineComponent>
            </HeadlineWrapper>
        </StyledHeadline>
    );
};

export default Headline;
