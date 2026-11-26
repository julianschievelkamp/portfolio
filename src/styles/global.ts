import { createGlobalStyle } from "styled-components";

import fonts from "./fonts";
import { transition } from "./variables";

export const PAGE_LOCKED_ATTRIBUTE = "data-page-locked";
export const SCROLL_ALLOWED_ATTRIBUTE = "data-scroll-allowed";
export const ZOOMED_ATTRIBUTE = "data-zoomed";
export const PINCHING_ATTRIBUTE = "data-pinching";
// Set while the artwork glides back after a pinch gesture
export const PINCH_SETTLING_ATTRIBUTE = "data-pinch-settling";

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

    html {
        text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        scrollbar-gutter: stable;
        overflow-y: auto;

        &[${PAGE_LOCKED_ATTRIBUTE}] {
            overflow-y: hidden;
        }

        &[${ZOOMED_ATTRIBUTE}] {
            overscroll-behavior-x: none;
            overscroll-behavior-y: none;
        }
    }

    body {
        transition: background-color ${transition.default};
        background-color: white;

        html[${PINCHING_ATTRIBUTE}] & {
            background-color: black;
        }
    }

    :focus-visible {
        outline: none;
    }

    .no-transition * {
        transition: none !important;
    }

    /* Reduced motion: transitions finish almost immediately.
       0.01ms instead of none so transitionend and animationend events still fire */
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
