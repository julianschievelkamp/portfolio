import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";

interface GlobalStyleProps {
    $isScrollLocked: boolean;
}

export default createGlobalStyle<GlobalStyleProps>`
    ${fonts};

    :root {
        --100svh: 100vh;
    }

    @supports (height: 100svh) {
        :root {
            --100svh: 100svh;
        }
    }  

    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }

    :focus-visible {
        outline: 0;
    }

    html, body {
        margin: 0;
        padding: 0;
        font-size: 100%;
        width: 100vw;
        overflow-x: hidden;
        overflow-y: ${({ $isScrollLocked }) => ($isScrollLocked ? "hidden" : "scroll")};
        touch-action: ${({ $isScrollLocked }) => ($isScrollLocked ? "none" : undefined)};
        background-color: white;
        position: relative;
    }

    .no-transition * {
        transition: none !important;
    }
`;
