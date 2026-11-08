import React from "react";

import { StyledDivider, StyledHeadline, TextWrapper } from "./Divider.styles";

export interface DividerProps {
    children: React.ReactNode;
    className?: string;
}

const Divider = ({ children, className }: DividerProps) => {
    return (
        <StyledDivider className={className}>
            <TextWrapper>
                <StyledHeadline type="h2" textAlign="center">
                    {children}
                </StyledHeadline>
            </TextWrapper>
        </StyledDivider>
    );
};

export default Divider;
