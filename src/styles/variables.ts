import { css } from "styled-components";

export const TRANSITION_DEFAULT = 300;

export const transition = {
    fastest: `${TRANSITION_DEFAULT / 3}ms ease-out`,
    fast: `${TRANSITION_DEFAULT}ms ease-out`,
};

export const colors = {
    primary: "#ffca00",
    secondary: "rgb(0, 0, 0, 0.5)",
};

export const queries = {
    sm: "screen and (min-width: 576px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 992px)",
    xl: "screen and (min-width: 1200px)",
    hover: "(hover: hover)",
    touch: "(pointer: coarse)",
    portrait: "(orientation: portrait)",
    landscape: "(orientation: landscape)",
    landscapeLgMax:
        "screen and (max-width: 991px) and (orientation: landscape)",
};

export const thumbnailSize = "(max-width: 1200px) 300px, 600px";

export const scrollStyles = css`
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE und Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }
`;

// Blendet Inhalte visuell aus, lässt sie aber für Screenreader und Suchmaschinen bestehen
export const visuallyHidden = css`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
`;
