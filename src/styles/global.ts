import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { colors, transition } from "./variables";

export const PAGE_LOCKED_ATTRIBUTE = "data-page-locked";
export const SCROLL_ALLOWED_ATTRIBUTE = "data-scroll-allowed";
export const ZOOMED_ATTRIBUTE = "data-zoomed";
export const PINCHING_ATTRIBUTE = "data-pinching";

export default createGlobalStyle`
    ${fonts};

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-size: 100%;
        min-height: 100svh;
        position: relative;
        overflow-x: clip;
    }

    html[${ZOOMED_ATTRIBUTE}],
    html[${ZOOMED_ATTRIBUTE}] body {
        overscroll-behavior-x: none;
        overscroll-behavior-y: none;
    }

    html {
        text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }

    body {
        overflow-y: scroll;
        transition: background-color ${transition.default};
        background-color: white;

        &[${PAGE_LOCKED_ATTRIBUTE}] {
            overflow-y: hidden;
        }

        html[${PINCHING_ATTRIBUTE}] & {
            background-color: black;
        }
    }

    :focus-visible {
        outline: 2px solid ${colors.highlight};
    }

    .no-transition * {
        transition: none !important;
    }

    /* Reduzierte Bewegung: Übergänge laufen nahezu sofort ab.
       0.01ms statt none, damit transitionend- und animationend-Events weiterhin feuern */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
        }
    }
`;
