import type { ComponentProps, ReactNode } from "react";

import { StyledLink } from "./Link.styles";

export interface LinkProps extends ComponentProps<"a"> {
    children: ReactNode;
    href: string;
    underline?: boolean;
}

const Link = ({ underline = true, target, tabIndex, ...props }: LinkProps) => {
    return (
        <StyledLink
            {...props}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            $underline={underline}
            // Ohne explizites tabIndex fokussiert Safari Links nicht per Tab
            tabIndex={tabIndex ?? 0}
        />
    );
};

export default Link;
