import React from "react";

import { StyledLink } from "./styles";

export interface LinkProps {
    children: React.ReactNode;
    href: string;
    target?: string;
    onClick?: () => void;
    underline?: boolean;
    className?: string;
}

const Link = ({
    children,
    href,
    target,
    onClick,
    underline = true,
    className,
}: LinkProps) => {
    return (
        <StyledLink
            href={href}
            target={target}
            onClick={onClick}
            $underline={underline}
            className={className}
        >
            {children}
        </StyledLink>
    );
};

export default Link;
