import React from "react";

import { StyledDivider, TextWrapper } from "./styles";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";
import Headline from "../headline";

export interface DividerProps {
    children: React.ReactNode;
}

const Divider = ({ children }: DividerProps) => {
    const isMd = useMediaQuery(queries.md);

    return (
        <StyledDivider>
            <TextWrapper>
                <Headline
                    type="h2"
                    textAlign="center"
                    fontSize={isMd ? "1.5rem" : "1.25rem"}
                >
                    {children}
                </Headline>
            </TextWrapper>
        </StyledDivider>
    );
};

export default Divider;
