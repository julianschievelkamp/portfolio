import React from "react";

import { StyledLink } from "./Link.styles";

export interface LinkProps {
    children: React.ReactNode;
    href: string;
    target?: string;
    onClick?: () => void;
    underline?: boolean;
    ariaCurrent?: "page";
    tabIndex?: number;
    className?: string;
}

const Link = ({
    children,
    href,
    target,
    onClick,
    underline = true,
    ariaCurrent,
    tabIndex,
    className,
}: LinkProps) => {
    return (
        <StyledLink
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            onClick={onClick}
            $underline={underline}
            aria-current={ariaCurrent}
            tabIndex={tabIndex ?? 0}
            className={className}
        >
            {children}
        </StyledLink>
    );
};

export default Link;
