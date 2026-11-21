import { styled } from "styled-components";

import { transition } from "styles/variables";

export const StyledText = styled.p<{
    $bold?: boolean;
    $color?: string;
    $fontSize?: string;
    $margin?: string;
    $textAlign?: "left" | "center" | "right" | "justify";
    $toUpperCase?: boolean;
    $whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
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
