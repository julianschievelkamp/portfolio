import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledText = styled.p<{
    color?: string;
    $bold?: boolean;
    $textAlign?: "left" | "center" | "right" | "justify";
    $margin?: string;
    $fontSize?: string;
    $lineHeight?: string;
    $whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";
}>`
    text-align: ${({ $textAlign }) => $textAlign};
    font-weight: ${({ $bold }) => ($bold ? "bold" : "normal")};
    font-size: ${({ $fontSize }) => $fontSize};
    margin: ${({ $margin }) => $margin};
    color: ${({ color }) => color ?? "black"};
    line-height: ${({ $lineHeight }) => $lineHeight};
    white-space: ${({ $whiteSpace }) => $whiteSpace};
    transition: color ${transition.fast};
    font-family: "Poppins", sans-serif;
`;
