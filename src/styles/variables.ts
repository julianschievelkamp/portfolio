import { Theme } from "data/types";
import { css } from "styled-components";

export const lightTheme: Theme = {
    body: "#FFFFFF",
    text: "#000000",
    icon: "#999999",
    hover: "#ffca00",
    border: "#000000",
};

export const darkTheme: Theme = {
    body: "#000000",
    text: "#FFFFFF",
    icon: "#999999",
    hover: "#ffca00",
    border: "#FFFFFF",
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
