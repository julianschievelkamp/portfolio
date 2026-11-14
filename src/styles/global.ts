import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { transition } from "./variables";

interface GlobalStyleProps {
    $isPageLocked: boolean;
}

export default createGlobalStyle<GlobalStyleProps>`
    ${fonts};

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-size: 100%;
        width: 100vw;
        min-height: 100vh;
        min-height: 100svh;
        position: relative;
        transition: background-color ${transition.default};
    }

    html:has([data-pinching]),
    html:has([data-pinching]) body {
        background-color: black;
    }

    body {
        overflow-x: clip;
        overflow-y: ${({ $isPageLocked }) => ($isPageLocked ? "hidden" : "scroll")};
    }

    :focus-visible {
        outline: 0;
    }

    .no-transition * {
        transition: none !important;
    }
`;
