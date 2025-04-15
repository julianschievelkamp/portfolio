import { Theme } from "styles/variables";
import { styled, css } from "styled-components";
import { transition } from "styles/variables";

type headlineProps = {
    theme: Theme;
    color?: string;
    $textAlign?: "left" | "center" | "right" | "justify";
    $margin?: string;
    $fontSize?: string;
    $lineHeight?: string;
};

const headlineStyles = css<headlineProps>`
    text-align: ${({ $textAlign }) => $textAlign};
    font-size: ${({ $fontSize }) => $fontSize};
    margin: ${({ $margin }) => $margin};
    color: ${({ color, theme }) => color ?? theme.primary};
    line-height: ${({ $lineHeight }) => $lineHeight};
    transition: color ${transition.fast};
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
`;

export const H1 = styled.h1<headlineProps>`
    ${headlineStyles}
`;

export const H2 = styled.h2<headlineProps>`
    ${headlineStyles}
`;
