import { styled, css } from "styled-components";

type headlineProps = {
    color?: string;
    $textAlign?: "left" | "center" | "right" | "justify";
    $fontSize?: string;
};

const headlineStyles = css<headlineProps>`
    text-align: ${({ $textAlign }) => $textAlign};
    font-size: ${({ $fontSize }) => $fontSize};
    margin: 0;
    color: ${({ color }) => color ?? "black"};
    line-height: 1.5;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
`;

export const H1 = styled.h1<headlineProps>`
    ${headlineStyles}
`;

export const H2 = styled.h2<headlineProps>`
    ${headlineStyles}
`;
