import type { ReactNode } from "react";

import { H1, H2 } from "./Headline.styles";

const headlines = {
    h1: H1,
    h2: H2,
};

interface HeadlineProps {
    children?: ReactNode;
    type?: "h1" | "h2";
    visuallyHidden?: boolean;
}

const Headline = ({ children, type = "h1", visuallyHidden }: HeadlineProps) => {
    const HeadlineComponent = headlines[type];

    return (
        <HeadlineComponent $visuallyHidden={visuallyHidden}>
            {children}
        </HeadlineComponent>
    );
};

export default Headline;
