import type { CSSProperties } from "react";
import { styled } from "styled-components";

import { transition } from "styles/variables";

export const StyledText = styled.p<{
    $bold?: boolean;
    $color?: string;
    $fontSize?: string;
    $margin?: string;
    $textAlign?: CSSProperties["textAlign"];
    $toUpperCase?: boolean;
    $whiteSpace?: CSSProperties["whiteSpace"];
}>`
    text-align: ${({ $textAlign }) => $textAlign};
    font-weight: ${({ $bold }) => ($bold ? "bold" : "normal")};
    font-size: ${({ $fontSize }) => $fontSize};
    margin: ${({ $margin }) => $margin};
    color: ${({ $color }) => $color ?? "black"};
    text-transform: ${({ $toUpperCase }) =>
        $toUpperCase ? "uppercase" : "none"};
    line-height: 1.5;
    transition: color ${transition.default};
    font-family: "Poppins", sans-serif;
`;
