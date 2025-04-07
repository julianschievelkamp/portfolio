import React from "react";

import { StyledDivider, TextWrapper } from "./styles";
import Text from "../text";
import { useMediaQuery } from "hooks/useMediaQuery";
import { queries } from "styles/variables";

export interface DividerProps {
    children: React.ReactNode;
}

const Divider = ({ children }: DividerProps) => {
    const isMd = useMediaQuery(queries.md);

    return (
        <StyledDivider>
            <TextWrapper>
                <Text
                    type="headline"
                    textAlign="center"
                    fontSize={isMd ? "1.5rem" : "1.25rem"}
                >
                    {children}
                </Text>
            </TextWrapper>
        </StyledDivider>
    );
};

export default Divider;
