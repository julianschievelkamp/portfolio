import { Theme } from "data/types";
import styled, { css } from "styled-components";
import { transition } from "styles/variables";

export const StyledText = styled.p<{
    theme: Theme;
    color?: string;
    $bold?: boolean;
    $textAlign?: "left" | "center" | "right";
    $margin?: string;
    $fontSize?: string;
    $lineHeight?: string;
    $type?: "paragraph" | "headline";
}>`
    text-align: ${({ $textAlign }) => $textAlign};
    font-weight: ${({ $bold }) => ($bold ? "bold" : "normal")};
    font-size: ${({ $fontSize }) => $fontSize};
    margin: ${({ $margin }) => $margin};
    color: ${({ color, theme }) => color ?? theme.text};
    line-height: ${({ $lineHeight }) => $lineHeight};
    transition: color ${transition.fast};
    font-family: "Poppins", serif;

    ${({ $type }) =>
        $type === "headline" &&
        css<{ theme: Theme; color?: string }>`
            font-family: "PlayfairDisplay", serif;
            font-weight: 900;
        `}
`;
