import { styled } from "styled-components";
import { transition } from "styles/variables";

export const StyledText = styled.p<{
    color?: string;
    $bold?: boolean;
    $textAlign?: "left" | "center" | "right" | "justify";
    $margin?: string;
    $fontSize?: string;
    $lineHeight?: string;
}>`
    text-align: ${({ $textAlign }) => $textAlign};
    font-weight: ${({ $bold }) => ($bold ? "bold" : "normal")};
    font-size: ${({ $fontSize }) => $fontSize};
    margin: ${({ $margin }) => $margin};
    color: ${({ color }) => color ?? "black"};
    line-height: ${({ $lineHeight }) => $lineHeight};
    transition: color ${transition.fast};
    font-family: "Poppins", sans-serif;
`;
