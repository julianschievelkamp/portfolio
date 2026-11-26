import { css } from "styled-components";

export const TRANSITION_DEFAULT = 300;

export const transition = {
    default: `${TRANSITION_DEFAULT}ms ease-out`,
    defaultExit: `${TRANSITION_DEFAULT}ms ease-in`,
    fast: `${TRANSITION_DEFAULT / 3}ms ease-out`,
};

export const colors = {
    highlight: "rgba(255, 192, 0, 1)",
    opacity25: "rgba(255, 255, 255, 0.75)",
    placeholder: "whitesmoke",
    playButton: "rgba(0, 0, 0, 0.4)",
    secondary: "rgba(0, 0, 0, 0.6)",
};

export const queries = {
    sm: "screen and (min-width: 576px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 992px)",
    xl: "screen and (min-width: 1200px)",
    hover: "(hover: hover)",
    portrait: "(orientation: portrait)",
    landscape: "(orientation: landscape)",
    landscapeLgMax:
        "screen and (max-width: 991px) and (orientation: landscape)",
};

export const thumbnailSize = "(max-width: 1200px) 300px, 600px";

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
