import { css } from "styled-components";

export type Theme = {
    body: string;
    text: string;
    secondary: string;
    tertiary: string;
    hover: string;
};

export const lightTheme: Theme = {
    body: "rgb(255, 255, 255, 1)",
    text: "rgb(0, 0, 0, 1)",
    secondary: "rgb(0, 0, 0, 0.5)",
    tertiary: "rgb(0, 0, 0, 0.05)",
    hover: "#ffca00",
};

export const darkTheme: Theme = {
    body: "rgb(0, 0, 0, 1)",
    text: "rgb(255, 255, 255, 1)",
    secondary: "rgb(255, 255, 255, 0.5)",
    tertiary: "rgb(255, 255, 255, 0.1)",
    hover: "#ffca00",
};

export const queries = {
    sm: "screen and (min-width: 576px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 992px)",
    xl: "screen and (min-width: 1200px)",
    hover: "(hover: hover)",
};

export const transition = {
    fastest: "100ms ease-out",
    fast: "300ms ease-out",
};

export const scrollStyles = css`
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;
