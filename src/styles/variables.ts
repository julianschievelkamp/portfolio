import { css, styled } from "styled-components";

export const Section = styled.section``;
export const Footer = styled.footer``;
export const Div = styled.div``;

export const TRANSITION_DEFAULT = 300;
export const transition = {
    default: `${TRANSITION_DEFAULT}ms ease-out`,
    defaultIn: `${TRANSITION_DEFAULT}ms ease-in`,
    fast: `${TRANSITION_DEFAULT / 3}ms ease-out`,
};

export const colors = {
    highlight: "rgba(255, 200, 0, 1)",
    secondary: "rgba(0, 0, 0, 0.5)",
    fade: "rgb(240, 240, 240)",
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

// Seitliche sichere Abstände für Geräte mit Notch/Dynamic Island im Querformat (viewport-fit=cover).
// Ohne Notch bzw. auf Desktop liefern die Werte 0px.
export const safeArea = {
    right: "env(safe-area-inset-right, 0px)",
    left: "env(safe-area-inset-left, 0px)",
};

export const thumbnailSize = "(max-width: 1200px) 300px, 600px";

export const mainTitleStyles = css`
    text-transform: uppercase;
    font-family: "PlayfairDisplay", sans-serif;
    font-weight: 900;
    font-size: 1.25rem;

    @media ${queries.md} {
        font-size: 1.5rem;
    }
`;

// Hintergrundflächen bis hinter die mobilen dynamischen Browser-Leisten ermöglichen.
export const absoluteOverlayStyles = css`
    touch-action: none;
    position: absolute;
    background-color: white;
    top: 0;
    left: 0;
    height: 100vh;
    height: 100dvh;
    box-shadow: 0 100vh 0 0 white;
    box-shadow: 0 100svh 0 0 white;

    @media ${queries.md} {
        position: fixed;
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
