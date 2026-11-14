import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { colors, transition } from "./variables";

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
        min-height: 100vh;
        min-height: 100svh;
        position: relative;
        overflow-x: clip;
    }

    body {
        overflow-y: ${({ $isPageLocked }) => ($isPageLocked ? "hidden" : "scroll")};
        transition: background-color ${transition.default};
        background-color: white;

        html:has([data-pinching]) & {
            background-color: black;
        }
    }

    :focus-visible {
        outline: 2px solid ${colors.highlight};
    }

    .no-transition * {
        transition: none !important;
    }
`;
