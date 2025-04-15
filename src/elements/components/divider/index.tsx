import React from "react";

import { StyledDivider, StyledHeadline, TextWrapper } from "./styles";

export interface DividerProps {
    children: React.ReactNode;
}

const Divider = ({ children }: DividerProps) => {
    return (
        <StyledDivider>
            <TextWrapper>
                <StyledHeadline type="h2" textAlign="center">
                    {children}
                </StyledHeadline>
            </TextWrapper>
        </StyledDivider>
    );
};

export default Divider;
