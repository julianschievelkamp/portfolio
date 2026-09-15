import { css } from "styled-components";

export const colors = {
    secondary: "rgb(0, 0, 0, 0.5)",
    yellow: "#ffca00",
};

export const queries = {
    sm: "screen and (min-width: 576px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 992px)",
    xl: "screen and (min-width: 1200px)",
    hover: "(hover: hover)",
    landscape: "(orientation: landscape)",
    portrait: "(orientation: portrait)",
};

export const thumbnailSize = "(max-width: 1200px) 300px, 600px";

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
