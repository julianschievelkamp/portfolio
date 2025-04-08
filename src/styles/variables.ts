import { css } from "styled-components";

export type Theme = {
    body: string;
    text: string;
    secondary: string;
    tertiary: string;
    border: string;
    hover: string;
};

export const lightTheme: Theme = {
    body: "rgb(255, 255, 255, 1)",
    text: "rgb(0, 0, 0, 1)",
    secondary: "rgb(0, 0, 0, 0.5)",
    tertiary: "rgb(0, 0, 0, 0.05)",
    border: "rgb(0, 0, 0, 1)",
    hover: "#ffca00",
};

export const darkTheme: Theme = {
    body: "rgb(0, 0, 0, 1)",
    text: "rgb(255, 255, 255, 1)",
    secondary: "rgb(255, 255, 255, 0.5)",
    tertiary: "rgb(255, 255, 255, 0.1)",
    border: "rgb(255, 255, 255, 1)",
    hover: "#ffca00",
};

export const queries = {
    xs: "screen and (min-width: 350px)",
    sm: "screen and (min-width: 576px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 992px)",
    xl: "screen and (min-width: 1200px)",
    xxl: "screen and (min-width: 1600px)",
    xxxl: "screen and (min-width: 2000px)",
    hover: "(hover: hover)",
};

export const borderRadius = {
    round: "100px",
    edged: "10px",
};

export const transition = {
    fastest: "100ms ease-out",
    fast: "300ms ease-out",
};

export const shadow = {
    soft: "0 0 8px 0 rgba(0, 0, 0, 0.1)",
    hard: "2px 2px 3px 0 rgba(0, 0, 0, 0.2)",
};

export const scrollStyles = css`
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;
