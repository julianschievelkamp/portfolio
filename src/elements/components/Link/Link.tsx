import type { ComponentProps, ReactNode } from "react";

import { StyledLink } from "./Link.styles";

interface LinkProps extends ComponentProps<"a"> {
    children: ReactNode;
    href: string;
    underline?: boolean;
}

const Link = ({
    tabIndex = 0,
    target,
    underline = true,
    ...props
}: LinkProps) => (
    <StyledLink
        {...props}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        $underline={underline}
        tabIndex={tabIndex}
    />
);

export default Link;
